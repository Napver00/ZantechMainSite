document.addEventListener('DOMContentLoaded', () => {
    const apiBase = '/api';
    const ITEMS_PER_PAGE = 6;

    // --- Generic CRUD and Pagination Logic ---
    function setupCRUD(section) {
        const container = document.getElementById(`${section}s-container`);
        const addBtn = document.getElementById(`add-${section}-btn`);
        const modal = document.getElementById(`${section}-modal`);
        const closeModalBtn = document.getElementById(`close-${section}-modal-btn`);
        const form = document.getElementById(`${section}-form`);
        const modalTitle = document.getElementById(`${section}-modal-title`);
        const paginationContainer = document.getElementById(`${section}s-pagination`);

        let currentPage = 1;
        let allItems = [];

        const openModal = () => modal.classList.replace('hidden', 'flex');
        const closeModal = () => modal.classList.replace('flex', 'hidden');

        addBtn.addEventListener('click', () => {
            modalTitle.textContent = `Add New ${section.charAt(0).toUpperCase() + section.slice(1)}`;
            form.reset();
            form.querySelector('input[name="id"]').value = '';
            openModal();
        });
        closeModalBtn.addEventListener('click', closeModal);

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const id = formData.get('id');
            const url = id ? `${apiBase}/${section}s/${id}` : `${apiBase}/${section}s`;
            const method = id ? 'PUT' : 'POST';
            try {
                const res = await fetch(url, { method, body: formData });
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                closeModal();
                loadData();
            } catch (error) {
                alert(`Error saving ${section}. See console for details.`);
            }
        });

        container.addEventListener('click', async (e) => {
            const target = e.target.closest('button');
            if (!target) return;
            const id = target.dataset.id;
            if (!id) return;

            if (target.classList.contains('edit-btn')) {
                const itemToEdit = allItems.find(item => item.id == id);
                if (itemToEdit) {
                    modalTitle.textContent = `Edit ${section.charAt(0).toUpperCase() + section.slice(1)}`;
                    for (const key in itemToEdit) {
                        const input = form.querySelector(`[name="${key}"]`);
                        if (input) {
                            if (input.type === 'file') input.value = '';
                            else if (Array.isArray(itemToEdit[key])) input.value = itemToEdit[key].join(', ');
                            else input.value = itemToEdit[key];
                        }
                    }
                    openModal();
                }
            }

            if (target.classList.contains('delete-btn')) {
                if (confirm(`Are you sure you want to delete this ${section}?`)) {
                    try {
                        const res = await fetch(`${apiBase}/${section}s/${id}`, { method: 'DELETE' });
                        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                        loadData();
                    } catch (error) {
                        alert(`Error deleting ${section}. See console for details.`);
                    }
                }
            }
        });
        
        paginationContainer.addEventListener('click', (e) => {
            const target = e.target.closest('button');
            if (!target) return;
            if (target.id === `prev-${section}-btn`) currentPage--;
            if (target.id === `next-${section}-btn`) currentPage++;
            renderData();
        });

        function renderData() {
            const start = (currentPage - 1) * ITEMS_PER_PAGE;
            const end = start + ITEMS_PER_PAGE;
            const paginatedItems = allItems.slice(start, end);

            container.innerHTML = paginatedItems.map(item => section === 'project' ? projectCard(item) : ambassadorCard(item)).join('');
            
            // Pagination controls
            const pageCount = Math.ceil(allItems.length / ITEMS_PER_PAGE);
            paginationContainer.innerHTML = `
                <button id="prev-${section}-btn" class="bg-gray-700 px-4 py-2 rounded-lg disabled:opacity-50" ${currentPage === 1 ? 'disabled' : ''}>Previous</button>
                <span class="px-4">Page ${currentPage} of ${pageCount || 1}</span>
                <button id="next-${section}-btn" class="bg-gray-700 px-4 py-2 rounded-lg disabled:opacity-50" ${currentPage >= pageCount ? 'disabled' : ''}>Next</button>
            `;
            paginationContainer.classList.toggle('hidden', allItems.length <= ITEMS_PER_PAGE);
        }

        async function loadData() {
            try {
                const res = await fetch(`${apiBase}/${section}s`);
                allItems = await res.json();
                currentPage = 1;
                renderData();
            } catch (error) {
                container.innerHTML = `<p class="text-red-400">Could not load ${section}s.</p>`;
            }
        }
        
        loadData();
    }

    // --- Card Templates ---
    const projectCard = p => `
        <div class="bg-gray-900 rounded-xl border border-gray-700 flex flex-col">
            ${p.image ? `<img src="${p.image}" alt="${p.title}" class="w-full h-40 object-cover rounded-t-xl mb-4">` : '<div class="w-full h-40 bg-gray-700 rounded-t-xl"></div>'}
            <div class="p-6 pt-0 flex flex-col flex-grow">
                <h3 class="text-xl font-bold mb-2">${p.title}</h3>
                <p class="text-gray-400 mb-4 flex-grow text-sm">${p.description}</p>
                <div class="flex items-center justify-between mt-auto">
                    <span class="text-xs font-semibold py-1 px-2 uppercase rounded-full text-white ${p.status === 'Completed' ? 'bg-green-600' : 'bg-blue-600'}">${p.status}</span>
                    <div class="flex space-x-2"><button data-id="${p.id}" class="edit-btn bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">Edit</button><button data-id="${p.id}" class="delete-btn bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">Delete</button></div>
                </div>
            </div>
        </div>`;

    const ambassadorCard = a => `
        <div class="bg-gray-900 rounded-xl border border-gray-700 flex flex-col">
            ${a.image ? `<img src="${a.image}" alt="${a.name}" class="w-full h-40 object-cover rounded-t-xl mb-4">` : '<div class="w-full h-40 bg-gray-700 rounded-t-xl"></div>'}
            <div class="p-6 pt-0 flex flex-col flex-grow">
                <h3 class="text-xl font-bold mb-2">${a.name}</h3>
                <p class="text-cyan-400 mb-4 flex-grow">${a.campus}</p>
                <div class="flex space-x-2 mt-auto"><button data-id="${a.id}" class="edit-btn bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded w-full">Edit</button><button data-id="${a.id}" class="delete-btn bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded w-full">Delete</button></div>
            </div>
        </div>`;

    // --- Initialize CRUD for both sections ---
    setupCRUD('project');
    setupCRUD('ambassador');
});