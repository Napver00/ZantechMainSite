document.addEventListener('DOMContentLoaded', () => {
    const apiBase = '/api';

    // --- Navigation Logic ---
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.dashboard-section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);

            sections.forEach(section => {
                section.classList.toggle('hidden', section.id !== targetId);
            });

            navLinks.forEach(navLink => {
                navLink.classList.remove('bg-cyan-600', 'text-white');
                navLink.classList.add('text-gray-300', 'hover:bg-gray-700');
            });

            link.classList.add('bg-cyan-600', 'text-white');
            link.classList.remove('text-gray-300', 'hover:bg-gray-700');
        });
    });

    // --- Generic CRUD Logic ---
    function setupCRUD(section, itemsPerPage = 6) {
        const container = document.getElementById(`${section}s-container`);
        const addBtn = document.getElementById(`add-${section}-btn`);
        const modal = document.getElementById(`${section}-modal`);
        const closeModalBtn = document.getElementById(`close-${section}-modal-btn`);
        const form = document.getElementById(`${section}-form`);
        const modalTitle = document.getElementById(`${section}-modal-title`);
        const paginationContainer = document.getElementById(`${section}s-pagination`);

        let currentPage = 1;
        let allItems = [];

        if (addBtn) {
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
                    const res = await fetch(url, {
                        method,
                        body: formData
                    });
                    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                    closeModal();
                    loadData();
                } catch (error) {
                    console.error(`Error saving ${section}:`, error);
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
                            const res = await fetch(`${apiBase}/${section}s/${id}`, {
                                method: 'DELETE'
                            });
                            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                            loadData();
                        } catch (error) {
                            console.error(`Error deleting ${section}:`, error);
                            alert(`Error deleting ${section}. See console for details.`);
                        }
                    }
                }
            });
        }

        if(paginationContainer) {
            paginationContainer.addEventListener('click', (e) => {
                const target = e.target.closest('button');
                if (!target || !target.dataset.page) return;
                currentPage = parseInt(target.dataset.page, 10);
                renderData();
            });
        }


        function renderData() {
            const start = (currentPage - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            const paginatedItems = allItems.slice(start, end);

            let cardTemplate;
            switch (section) {
                case 'project':
                    cardTemplate = projectCard;
                    break;
                case 'ambassador':
                    cardTemplate = ambassadorCard;
                    break;
                case 'contact':
                    cardTemplate = contactCard;
                    break;
                case 'ambassador-application':
                    cardTemplate = ambassadorApplicationCard;
                    break;
            }

            container.innerHTML = paginatedItems.map(cardTemplate).join('');

            if (paginationContainer) {
                const pageCount = Math.ceil(allItems.length / itemsPerPage);
                if (pageCount > 1) {
                    let paginationHTML = '';
                    for (let i = 1; i <= pageCount; i++) {
                        paginationHTML += `<button data-page="${i}" class="px-4 py-2 rounded-lg ${currentPage === i ? 'bg-cyan-600' : 'bg-gray-700'}">${i}</button>`;
                    }
                    paginationContainer.innerHTML = paginationHTML;
                    paginationContainer.classList.remove('hidden');
                } else {
                    paginationContainer.innerHTML = '';
                    paginationContainer.classList.add('hidden');
                }
            }
        }

        async function loadData() {
            try {
                const res = await fetch(`${apiBase}/${section}s`);
                let data = await res.json();
                allItems = Array.isArray(data) ? data.sort((a, b) => (b.id || b.submittedAt) < (a.id || a.submittedAt) ? -1 : 1) : []; // Sort descending
                currentPage = 1;
                renderData();
            } catch (error) {
                console.error(`Could not load ${section}s:`, error);
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

    const contactCard = c => `
        <div class="bg-gray-900 rounded-xl border border-gray-700 p-6">
            <div class="flex justify-between items-start mb-2">
                <h3 class="text-lg font-bold">${c.firstName} ${c.lastName}</h3>
                <span class="text-xs text-gray-400">${new Date(c.submittedAt).toLocaleString()}</span>
            </div>
            <p class="text-sm text-cyan-400 mb-2">${c.email}</p>
            <p class="text-sm text-gray-300 mb-4"><span class="font-semibold">Project Type:</span> ${c.projectType}</p>
            <p class="text-gray-400 bg-gray-800 p-3 rounded-lg">${c.message}</p>
        </div>`;

    const ambassadorApplicationCard = a => `
        <div class="bg-gray-900 rounded-xl border border-gray-700 p-6 flex space-x-6 items-start">
            ${a.image ? `<img src="${a.image}" alt="${a.name}" class="w-24 h-24 object-cover rounded-lg">` : ''}
            <div>
                <div class="flex justify-between items-start mb-2">
                    <h3 class="text-lg font-bold">${a.name}</h3>
                    <span class="text-xs text-gray-400">${new Date(a.submittedAt).toLocaleString()}</span>
                </div>
                <p class="text-sm text-cyan-400 mb-2">${a.email}</p>
                <p class="text-sm text-gray-300 mb-4"><span class="font-semibold">Campus:</span> ${a.campus}</p>
                <p class="text-gray-400 bg-gray-800 p-3 rounded-lg">${a.bio}</p>
            </div>
        </div>`;
        
    // --- Company Info Logic ---
    function setupCompanyInfo() {
        const form = document.getElementById('company-info-form');
        if (!form) return;
        const socialLinksContainer = document.getElementById('social-links-container');
        const addSocialLinkBtn = document.getElementById('add-social-link-btn');
        const statusEl = document.getElementById('company-info-status');

        let originalCompanyInfo = {};

        const populateForm = (data) => {
            originalCompanyInfo = data;
            form.querySelector('[name="herosection.title"]').value = data.herosection?.title || '';
            form.querySelector('[name="herosection.subtitle"]').value = data.herosection?.subtitle || '';
            form.querySelector('[name="herosection.description"]').value = data.herosection?.description || '';
            form.querySelector('[name="about.title"]').value = data.about?.title || '';
            form.querySelector('[name="about.description1"]').value = data.about?.description1 || '';
            form.querySelector('[name="about.description2"]').value = data.about?.description2 || '';
            form.querySelector('[name="contact.email"]').value = data.contact?.email || '';
            form.querySelector('[name="contact.phone"]').value = data.contact?.phone || '';
            form.querySelector('[name="contact.Location"]').value = data.contact?.Location || '';
            form.querySelector('[name="footer.text"]').value = data.footer?.text || '';

            socialLinksContainer.innerHTML = '';
            const socialLinks = data.footer?.socialLinks || [];
            socialLinks.forEach(renderSocialLink);
        };

        const renderSocialLink = (link) => {
            const div = document.createElement('div');
            div.className = 'flex items-center space-x-2 dynamic-social-link';
            div.innerHTML = `
                <input type="text" placeholder="Platform (e.g., Facebook)" value="${link.platform || ''}" data-key="platform" class="social-link-input w-1/3 px-4 py-2 bg-gray-800 border-gray-700 border rounded-lg">
                <input type="url" placeholder="URL" value="${link.url || ''}" data-key="url" class="social-link-input flex-grow px-4 py-2 bg-gray-800 border-gray-700 border rounded-lg">
                <button type="button" class="remove-social-link-btn bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm">Remove</button>
            `;
            socialLinksContainer.appendChild(div);
        };

        addSocialLinkBtn.addEventListener('click', () => {
            renderSocialLink({ platform: '', url: '' });
        });

        socialLinksContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-social-link-btn')) {
                e.target.closest('.dynamic-social-link').remove();
            }
        });

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            statusEl.textContent = 'Saving...';
            statusEl.className = 'text-center mt-4 h-6 text-yellow-400';

            const socialLinks = [];
            socialLinksContainer.querySelectorAll('.dynamic-social-link').forEach(row => {
                const platformInput = row.querySelector('[data-key="platform"]');
                const urlInput = row.querySelector('[data-key="url"]');
                if (platformInput.value && urlInput.value) {
                    socialLinks.push({
                        platform: platformInput.value,
                        url: urlInput.value
                    });
                }
            });

            const updatedInfo = {
                ...originalCompanyInfo,
                herosection: {
                    title: form.querySelector('[name="herosection.title"]').value,
                    subtitle: form.querySelector('[name="herosection.subtitle"]').value,
                    description: form.querySelector('[name="herosection.description"]').value,
                },
                about: {
                    title: form.querySelector('[name="about.title"]').value,
                    description1: form.querySelector('[name="about.description1"]').value,
                    description2: form.querySelector('[name="about.description2"]').value,
                },
                contact: {
                    email: form.querySelector('[name="contact.email"]').value,
                    phone: form.querySelector('[name="contact.phone"]').value,
                    Location: form.querySelector('[name="contact.Location"]').value,
                },
                footer: {
                    text: form.querySelector('[name="footer.text"]').value,
                    socialLinks: socialLinks
                }
            };

            try {
                const res = await fetch(`${apiBase}/company-info`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedInfo, null, 2)
                });
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                const result = await res.json();
                statusEl.textContent = result.message;
                statusEl.className = 'text-center mt-4 h-6 text-green-400';
                loadData();
            } catch (error) {
                console.error('Error saving company info:', error);
                statusEl.textContent = 'Error saving data.';
                statusEl.className = 'text-center mt-4 h-6 text-red-400';
            }

            setTimeout(() => {
                statusEl.textContent = '';
            }, 3000);
        });

        async function loadData() {
            try {
                const res = await fetch(`${apiBase}/company-info`);
                if (!res.ok) throw new Error('Failed to fetch company info');
                const data = await res.json();
                populateForm(data);
            } catch (error) {
                console.error(error);
                statusEl.textContent = 'Could not load company info.';
                statusEl.className = 'text-center mt-4 h-6 text-red-400';
            }
        }

        loadData();
    }


    // --- Initialize ---
    setupCRUD('project', 6);
    setupCRUD('ambassador', 6);
    setupCRUD('contact', 10);
    setupCRUD('ambassador-application', 10);
    setupCompanyInfo();
});
