/**
 * Connectify App JS
 * Handles Profile selections, Discovery Map similarity, and Networking actions
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ════════════════════════════════════════
       1. PROFILE CATEGORY TAGGING
       ════════════════════════════════════════ */
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        // Initialize max 15 tags view
        const categories = ['cat_interests', 'cat_talents', 'cat_hobbies', 'cat_life_aim'];
        categories.forEach(cat => {
            const container = document.getElementById(cat);
            if (!container) return;
            const badges = Array.from(container.querySelectorAll('.tag-badge-selectable'));
            
            badges.forEach((b, i) => {
                if (i >= 15) b.style.display = 'none';
            });
        });

        // View All Buttons
        document.querySelectorAll('.btn-view-all').forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.getAttribute('data-target');
                const container = document.getElementById(targetId);
                const badges = Array.from(container.querySelectorAll('.tag-badge-selectable'));
                const isExpanded = btn.classList.contains('expanded');
                
                if (isExpanded) {
                    badges.forEach((b, i) => { if (i >= 15 && !b.classList.contains('active')) b.style.display = 'none'; });
                    btn.textContent = 'View All';
                    btn.classList.remove('expanded');
                } else {
                    badges.forEach(b => b.style.display = 'inline-block');
                    btn.textContent = 'Show Less';
                    btn.classList.add('expanded');
                }
            });
        });

        // Search logic
        const setupSearch = (searchId, catId) => {
            const searchInput = document.getElementById(searchId);
            const container = document.getElementById(catId);
            if (!searchInput || !container) return;

            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase();
                const badges = Array.from(container.querySelectorAll('.tag-badge-selectable'));
                
                // If searching, bypass the 'limit 15' completely
                badges.forEach(b => {
                    const text = b.getAttribute('data-val').toLowerCase();
                    if (text.includes(query)) {
                        b.style.display = 'inline-block';
                    } else {
                        b.style.display = 'none';
                    }
                });
                
                // If query is empty, reset to 15 (if not expanded)
                if (!query) {
                    const btn = document.querySelector(`.btn-view-all[data-target="${catId}"]`);
                    const isExpanded = btn && btn.classList.contains('expanded');
                    badges.forEach((b, i) => {
                        if (!isExpanded && i >= 15 && !b.classList.contains('active')) b.style.display = 'none';
                        else b.style.display = 'inline-block';
                    });
                }
            });
        };
        setupSearch('search_interests', 'cat_interests');
        setupSearch('search_talents', 'cat_talents');
        setupSearch('search_hobbies', 'cat_hobbies');
        setupSearch('search_life_aim', 'cat_life_aim');

        const updateShowcase = (containerId, showcaseId, selectId, fileInputPrefix, inputsContainerId) => {
            const container = document.getElementById(containerId);
            const showcase = document.getElementById(showcaseId);
            const select = document.getElementById(selectId);
            const inputsContainer = document.getElementById(inputsContainerId);
            if (!container || !showcase || !select || !inputsContainer) return;

            const actives = Array.from(container.querySelectorAll('.active')).map(el => el.getAttribute('data-val'));
            
            // Reconcile inputs wrapper
            const existingWrappers = Array.from(inputsContainer.querySelectorAll('.showcase-input-wrapper'));
            const activeSet = new Set(actives);
            
            // Remove wrappers for inactive tags
            existingWrappers.forEach(wrap => {
                const topic = wrap.getAttribute('data-topic');
                if (!activeSet.has(topic)) {
                    wrap.remove();
                }
            });
            
            // Add wrappers for new active tags
            actives.forEach(act => {
                let wrap = inputsContainer.querySelector(`.showcase-input-wrapper[data-topic="${act}"]`);
                if (!wrap) {
                    wrap = document.createElement('div');
                    wrap.className = 'showcase-input-wrapper hidden w-full mt-2';
                    wrap.setAttribute('data-topic', act);
                    
                    const fileInput = document.createElement('input');
                    fileInput.type = 'file';
                    fileInput.name = `${fileInputPrefix}_${act}`;
                    fileInput.accept = 'image/*,video/*';
                    fileInput.className = 'text-sm file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200';
                    
                    const previewCont = document.createElement('div');
                    previewCont.className = 'preview-container mt-3';
                    
                    fileInput.addEventListener('change', (e) => {
                        const file = e.target.files[0];
                        previewCont.innerHTML = '';
                        if (file) {
                            const url = URL.createObjectURL(file);
                            if (file.type.startsWith('image/')) {
                                previewCont.innerHTML = `<img src="${url}" class="max-w-[200px] max-h-[200px] rounded object-cover shadow border border-gray-200">`;
                            } else if (file.type.startsWith('video/')) {
                                previewCont.innerHTML = `<video src="${url}" controls class="max-w-[200px] max-h-[200px] rounded object-cover shadow border border-gray-200"></video>`;
                            }
                        }
                    });
                    
                    wrap.appendChild(fileInput);
                    wrap.appendChild(previewCont);
                    inputsContainer.appendChild(wrap);
                }
            });

            if (actives.length > 0) {
                showcase.classList.remove('hidden');
                // preserve previously selected option if it's still active
                const currSelected = select.value;
                select.innerHTML = '<option value="" disabled selected>Select topic to showcase</option>';
                actives.forEach(act => {
                    const opt = document.createElement('option');
                    opt.value = act;
                    opt.textContent = act;
                    if (act === currSelected) opt.selected = true;
                    select.appendChild(opt);
                });
                if (!actives.includes(currSelected)) {
                    select.selectedIndex = 0;
                }
                
                // Show the corresponding input wrapper
                const allWrappers = inputsContainer.querySelectorAll('.showcase-input-wrapper');
                allWrappers.forEach(w => w.classList.add('hidden'));
                if (select.value) {
                    const activeWrap = inputsContainer.querySelector(`.showcase-input-wrapper[data-topic="${select.value}"]`);
                    if (activeWrap) activeWrap.classList.remove('hidden');
                }
            } else {
                showcase.classList.add('hidden');
            }
            
            // Add change listener to select if not already added
            if (!select.dataset.listenerAdded) {
                select.addEventListener('change', () => {
                    const allWrappers = inputsContainer.querySelectorAll('.showcase-input-wrapper');
                    allWrappers.forEach(w => w.classList.add('hidden'));
                    const activeWrap = inputsContainer.querySelector(`.showcase-input-wrapper[data-topic="${select.value}"]`);
                    if (activeWrap) activeWrap.classList.remove('hidden');
                });
                select.dataset.listenerAdded = 'true';
            }
        };

        document.querySelectorAll('.tag-badge-selectable').forEach(badge => {
            badge.addEventListener('click', () => {
                badge.classList.toggle('active');
                badge.classList.toggle('bg-blue-500');
                badge.classList.toggle('text-white');
                badge.classList.toggle('border-blue-500');
                badge.classList.toggle('text-gray-600');
                badge.classList.toggle('border-blue-200');

                // Check for Showcase updates
                const parentId = badge.parentElement.id;
                if (parentId === 'cat_talents') {
                    updateShowcase('cat_talents', 'showcase_talents', 'showcase_talent_topic', 'showcase_talent_file', 'showcase_talent_inputs_container');
                } else if (parentId === 'cat_hobbies') {
                    updateShowcase('cat_hobbies', 'showcase_hobbies', 'showcase_hobby_topic', 'showcase_hobby_file', 'showcase_hobby_inputs_container');
                }
            });
        });

        profileForm.addEventListener('submit', (e) => {
            // ONLY execute this mapping for the create-profile page!
            // Profile page has its own logic that stores directly to hidden fields upon Modal save.
            const mapTags = (containerId, hiddenId) => {
                const container = document.getElementById(containerId);
                if(container) {
                    const actives = Array.from(container.querySelectorAll('.active')).map(el => el.getAttribute('data-val'));
                    if (actives.length > 0 || container.querySelectorAll('.tag-badge-selectable').length > 0) {
                        document.getElementById(hiddenId).value = actives.join(',');
                    }
                }
            };
            mapTags('cat_interests', 'hidden_interests');
            mapTags('cat_talents', 'hidden_talents');
            mapTags('cat_hobbies', 'hidden_hobbies');
            mapTags('cat_life_aim', 'hidden_life_aim');
        });
    }

    /* ════════════════════════════════════════
       1.5 PROFILE EDIT MODAL (profile.html only)
       ════════════════════════════════════════ */
    const categoryModal = document.getElementById('categoryModal');
    if (categoryModal) {
        const titleEl = document.getElementById('modalCategoryTitle');
        const leftPane = document.getElementById('modalLeftPane');
        const rightPane = document.getElementById('modalRightPane');
        const searchInput = document.getElementById('modalSearchInput');
        const btnCancel = document.getElementById('cancelCategoryModal');
        const btnSave = document.getElementById('saveCategoryModal');
        const btnClose = document.getElementById('closeCategoryModal');
        
        let currentCategory = '';
        let sortableInst = null;
        
        const filePrefixMap = { 'talents': 'showcase_talent_file', 'hobbies': 'showcase_hobby_file' };
        
        const renderLeftItem = (itemText) => {
            const div = document.createElement('div');
            div.className = 'w-full bg-white border border-gray-200 rounded p-3 shadow-sm flex flex-col gap-2 relative group';
            div.setAttribute('data-val', itemText);
            
            // Top row: drag handle, text, remove
            const topRow = document.createElement('div');
            topRow.className = 'flex items-center justify-between';
            topRow.innerHTML = `
                <div class="flex items-center gap-2">
                    <span class="cursor-move text-gray-400 hover:text-gray-600 font-bold px-1">☰</span>
                    <span class="font-semibold text-gray-700">${itemText}</span>
                </div>
                <button type="button" class="text-red-400 hover:text-red-600 font-bold px-2 text-xl btn-remove-left" title="Remove">&times;</button>
            `;
            div.appendChild(topRow);
            
            topRow.querySelector('.btn-remove-left').addEventListener('click', () => {
                div.remove();
                renderRightPane();
            });
            
            // If talent/hobby, add file input
            if (currentCategory === 'talents' || currentCategory === 'hobbies') {
                const prefix = filePrefixMap[currentCategory];
                
                const fileContainer = document.createElement('div');
                fileContainer.className = 'mt-2 pt-2 border-t border-gray-100 flex flex-col gap-2';
                
                const label = document.createElement('span');
                label.className = 'text-xs text-gray-500 font-semibold';
                label.textContent = 'Add/Update Showcase Media:';
                
                const fileInp = document.createElement('input');
                fileInp.type = 'file';
                // Very important to dynamically generate name required by backend
                fileInp.name = `${prefix}_${itemText}`;
                fileInp.accept = 'image/*,video/*';
                fileInp.className = 'text-xs file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100';
                
                const previewCont = document.createElement('div');
                previewCont.className = 'preview-cont mt-1';
                
                // Pre-populate if exists
                if (window.CURRENT_SHOWCASES) {
                    const existing = window.CURRENT_SHOWCASES.find(s => s.type === (currentCategory === 'talents' ? 'talent' : 'hobby') && s.topic === itemText);
                    if (existing) {
                        const url = '/static/uploads/' + existing.file;
                        const lowerUrl = url.toLowerCase();
                        if (lowerUrl.endsWith('.mp4') || lowerUrl.endsWith('.webm') || lowerUrl.endsWith('.mov')) {
                            previewCont.innerHTML = `<video src="${url}" controls class="max-w-full h-auto max-h-[120px] rounded border border-gray-200 mt-1 object-contain"></video>`;
                        } else {
                            previewCont.innerHTML = `<img src="${url}" class="max-w-full h-auto max-h-[120px] rounded border border-gray-200 mt-1 object-contain">`;
                        }
                    }
                }
                
                fileInp.addEventListener('change', (e) => {
                    const file = e.target.files[0];
                    previewCont.innerHTML = '';
                    if (file) {
                        const url = URL.createObjectURL(file);
                        if (file.type.startsWith('image/')) {
                            previewCont.innerHTML = `<img src="${url}" class="max-w-full h-auto max-h-[120px] rounded border border-gray-200 mt-1 object-contain">`;
                        } else if (file.type.startsWith('video/')) {
                            previewCont.innerHTML = `<video src="${url}" controls class="max-w-full h-auto max-h-[120px] rounded border border-gray-200 mt-1 object-contain"></video>`;
                        }
                    }
                });
                
                fileContainer.appendChild(label);
                fileContainer.appendChild(fileInp);
                fileContainer.appendChild(previewCont);
                div.appendChild(fileContainer);
            }
            
            leftPane.appendChild(div);
        };
        
        const renderRightPane = () => {
            // Get what's currently active on the left
            const activeList = Array.from(leftPane.children).map(c => c.getAttribute('data-val'));
            const activeSet = new Set(activeList);
            
            const fullList = window.FULL_LISTS[currentCategory] || [];
            const query = searchInput.value.toLowerCase();
            
            rightPane.innerHTML = '';
            
            fullList.forEach(item => {
                if (activeSet.has(item)) return; // Don't show already selected
                if (query && !item.toLowerCase().includes(query)) return; // Filter
                
                const span = document.createElement('span');
                span.className = 'tag-badge bg-gray-50 border border-gray-200 text-gray-700 text-xs px-3 py-1.5 rounded-full cursor-pointer hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-colors';
                span.textContent = item;
                span.addEventListener('click', () => {
                    renderLeftItem(item);
                    renderRightPane(); // re-render to remove it from right
                });
                rightPane.appendChild(span);
            });
        };
        
        const openModal = (category) => {
            currentCategory = category;
            
            // Set Titles
            const titles = { interests: 'Edit Interests', talents: 'Edit Talents', hobbies: 'Edit Hobbies', life_aim: 'Edit Life Goals' };
            titleEl.textContent = titles[category] || 'Edit';
            
            // Load selected from hidden form data
            leftPane.innerHTML = '';
            const hiddenInp = document.getElementById(`hidden_${category}`);
            const prevSelected = hiddenInp.value ? hiddenInp.value.split(',') : [];
            
            prevSelected.forEach(item => renderLeftItem(item));
            
            // Reset right pane
            searchInput.value = '';
            renderRightPane();
            
            // Init sortable if not initialized
            if (sortableInst) sortableInst.destroy();
            sortableInst = new Sortable(leftPane, {
                animation: 150,
                handle: '.cursor-move',
                ghostClass: 'opacity-50'
            });
            
            categoryModal.classList.remove('hidden');
        };
        
        const closeModal = () => {
            categoryModal.classList.add('hidden');
            if (sortableInst) sortableInst.destroy();
            sortableInst = null;
        };
        
        searchInput.addEventListener('input', renderRightPane);
        
        btnClose.addEventListener('click', closeModal);
        btnCancel.addEventListener('click', closeModal);
        
        btnSave.addEventListener('click', () => {
            // Save state from Left Pane back to hidden inputs
            const activeItems = Array.from(leftPane.children).map(c => c.getAttribute('data-val'));
            document.getElementById(`hidden_${currentCategory}`).value = activeItems.join(',');
            
            // Move file inputs out of the modal and INTO the form so they submit
            const formInputsBucket = document.getElementById(`form_file_bucket_${currentCategory}`) || (() => {
                const b = document.createElement('div');
                b.id = `form_file_bucket_${currentCategory}`;
                b.className = 'hidden';
                document.getElementById('profileForm').appendChild(b);
                return b;
            })();
            
            formInputsBucket.innerHTML = ''; // Clear out old ones
            
            // Grab the populated file inputs from the DOM and move them to form
            Array.from(leftPane.children).forEach(child => {
                const inp = child.querySelector('input[type="file"]');
                if (inp && inp.files.length > 0) {
                     formInputsBucket.appendChild(inp);
                }
            });
            
            // Sync main UI display immediately
            const displayCont = document.getElementById(`display_${currentCategory}`);
            displayCont.innerHTML = '';
            activeItems.forEach(item => {
                const s = document.createElement('span');
                s.className = "tag-badge bg-blue-500 text-white border border-blue-500 text-xs px-3 py-1.5 rounded-full";
                s.textContent = item;
                if(currentCategory === 'talents' || currentCategory === 'hobbies'){
                    const divWrap = document.createElement('div');
                    divWrap.className = 'flex items-center gap-3';
                    const savedText = document.createElement('span');
                    savedText.className = 'text-xs text-gray-400 italic';
                    savedText.textContent = 'Saved in draft';
                    divWrap.appendChild(s);
                    divWrap.appendChild(savedText);
                    displayCont.appendChild(divWrap);
                } else {
                    displayCont.appendChild(s);
                }
            });
            
            closeModal();
            // Automatically submit form so the whole page refreshes with the new media from the server route
            document.getElementById('profileForm').submit();
        });
        
        // Bind triggering buttons
        document.querySelectorAll('.btn-edit-category').forEach(btn => {
            btn.addEventListener('click', () => {
                openModal(btn.getAttribute('data-category'));
            });
        });
    }

    /* ════════════════════════════════════════
       2. DISCOVERY MAP LAYOUT & SIMILARITY
       ════════════════════════════════════════ */
    const discoveryMap = document.getElementById('discoveryMap');
    if (discoveryMap) {
        // 1. Initialize Panzoom
        if (typeof panzoom !== 'undefined') {
            panzoom(discoveryMap, {
                maxZoom: 2.0,
                minZoom: 0.3,
                initialZoom: 0.7,
                bounds: true,
                boundsPadding: 0.1
            });
        }

        // 2. Phyllotaxis (Golden Spiral) Spacing
        const nodes = document.querySelectorAll('.nearby-node');
        
        nodes.forEach((node, index) => {
            // Golden angle in radians
            const goldenAngle = 137.508 * (Math.PI / 180);
            
            // Increment radius significantly harder so they spiral OUTWARDS and give space 
            // The more nodes, the further out they spread
            const radius = 130 + (index * 55); 
            const angle = index * goldenAngle;
            
            const jitterX = (Math.random() * 40 - 20);
            const jitterY = (Math.random() * 40 - 20);
            
            const x = (Math.cos(angle) * radius) + jitterX;
            const y = (Math.sin(angle) * radius) + jitterY;
            
            node.style.left = `calc(50% + ${x}px)`;
            node.style.top = `calc(50% + ${y}px)`;
            node.style.animation = `floating ${3 + Math.random()*2}s ease-in-out infinite alternate ${Math.random()*2}s`;
        });
        
        if(!document.getElementById('floatKeyframes')) {
            const style = document.createElement('style');
            style.id = 'floatKeyframes';
            style.innerHTML = `
                .nearby-node { will-change: transform; backface-visibility: hidden; }
                @keyframes floating { 
                    0% { transform: translate(-50%, -50%) translateY(0px); } 
                    100% { transform: translate(-50%, -50%) translateY(15px); } 
                }
            `;
            document.head.appendChild(style);
        }

        // Get current user traits for intersection
        const currentUserData = document.getElementById('currentUserData');
        const myInterests = currentUserData ? currentUserData.getAttribute('data-interests').split(',').filter(x=>x) : [];
        const myTalents = currentUserData ? currentUserData.getAttribute('data-talents').split(',').filter(x=>x) : [];
        const myHobbies = currentUserData ? currentUserData.getAttribute('data-hobbies').split(',').filter(x=>x) : [];
        const myAim = currentUserData ? currentUserData.getAttribute('data-aim').split(',').filter(x=>x) : [];
        const myTraitsSet = new Set([...myInterests, ...myTalents, ...myHobbies, ...myAim]);

        const modal = document.getElementById('profileModal');
        const overlay = document.getElementById('profileModalOverlay');
        const closeBtn = document.getElementById('closeModalBtn');
        const btnSendFriend = document.getElementById('btnSendFriend');

        let currentTargetId = null;

        nodes.forEach(node => {
            node.addEventListener('click', () => {
                currentTargetId = node.getAttribute('data-id');
                const name = node.getAttribute('data-name');
                const bio = node.getAttribute('data-bio');
                
                // Collect node traits
                const theirInterests = node.getAttribute('data-interests').split(',').filter(x=>x);
                const theirTalents = node.getAttribute('data-talents').split(',').filter(x=>x);
                const theirHobbies = node.getAttribute('data-hobbies').split(',').filter(x=>x);
                const theirAim = node.getAttribute('data-goal').split(',').filter(x=>x);
                const theirTraits = [...theirInterests, ...theirTalents, ...theirHobbies, ...theirAim];
                
                document.getElementById('modName').textContent = name;
                document.getElementById('modBio').textContent = '"' + bio + '"';
                document.getElementById('modAvatar').src = node.querySelector('img').src;
                
                const simDiv = document.getElementById('modSimilarities');
                const msgOut = document.getElementById('noMatchesMsg');
                simDiv.innerHTML = '';
                
                // Calculate Intersection
                const intersections = theirTraits.filter(trait => myTraitsSet.has(trait));
                const uniqueIntersections = [...new Set(intersections)]; // remove duplicates just in case

                if(uniqueIntersections.length > 0) {
                    msgOut.classList.add('hidden');
                    uniqueIntersections.forEach(int => {
                        const span = document.createElement('span');
                        span.className = 'tag-badge';
                        span.textContent = int;
                        simDiv.appendChild(span);
                    });
                } else {
                    msgOut.classList.remove('hidden');
                }
                
                modal.classList.add('show');
                overlay.classList.add('show');
            });
        });

        const closeModal = () => {
            modal.classList.remove('show');
            overlay.classList.remove('show');
            currentTargetId = null;
        };
        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', closeModal);

        btnSendFriend.addEventListener('click', () => {
             if(currentTargetId) {
                 sendNetworkRequest({type: 'friend', target_id: currentTargetId});
                 closeModal();
             }
        });
    }

    /* ════════════════════════════════════════
       3. MEETUP REQUESTS MODAL (Network Page)
       ════════════════════════════════════════ */
    const meetupBtns = document.querySelectorAll('.btn-meetup');
    const schedModal = document.getElementById('scheduleModal');
    const schedOverlay = document.getElementById('scheduleModalOverlay');
    const closeSchedBtn = document.getElementById('closeScheduleBtn');
    const btnSubmitMeetup = document.getElementById('btnSubmitMeetup');
    let schedTargetId = null;

    if (schedModal) {
        meetupBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                schedTargetId = btn.getAttribute('data-id');
                const targetName = btn.getAttribute('data-name');
                document.getElementById('schedName').textContent = targetName;
                schedModal.classList.add('show');
                schedOverlay.classList.add('show');
            });
        });

        const closeSchedModal = () => {
            schedModal.classList.remove('show');
            schedOverlay.classList.remove('show');
            schedTargetId = null;
        };
        closeSchedBtn.addEventListener('click', closeSchedModal);
        schedOverlay.addEventListener('click', closeSchedModal);

        btnSubmitMeetup.addEventListener('click', () => {
            const mDate = document.getElementById('schedDate').value;
            const mTime = document.getElementById('schedTime').value;
            const mPlace = document.getElementById('schedPlace').value;

            if(!mDate || !mTime || !mPlace) {
                if(typeof showToast === 'function') showToast('⚠️ Please fill out all meetup details.');
                return;
            }

            if(schedTargetId) {
                sendNetworkRequest({
                    type: 'meetup', 
                    target_id: schedTargetId,
                    date: mDate,
                    time: mTime,
                    place: mPlace
                });
                closeSchedModal();
            }
        });
    }

    /* ════════════════════════════════════════
       4. AJAX REQUEST HELPER
       ════════════════════════════════════════ */
    function sendNetworkRequest(payload) {
        fetch('/api/send-request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(data => {
            if(typeof showToast === 'function') {
                showToast(`✅ ${data.message}`, 4000);
            } else {
                alert(data.message);
            }
        })
        .catch(err => {
            console.error(err);
            if(typeof showToast === 'function') showToast('❌ Failed to send request.', 3000);
        });
    }

    /* ════════════════════════════════════════
       5. FULL PROFILE MODAL (Network Page)
       ════════════════════════════════════════ */
    const fullProfileModalOverlay = document.getElementById('fullProfileModalOverlay');
    if (fullProfileModalOverlay) {
        const titleEl = document.getElementById('fpName');
        const descEl = document.getElementById('fpBio');
        const imgEl = document.getElementById('fpAvatar');
        
        const phoneEl = document.getElementById('fpPhone');
        const instaEl = document.getElementById('fpInstagram');
        const snapEl = document.getElementById('fpSnapchat');
        const traitsContainer = document.getElementById('fpTraitsContainer');
        const closeBtn = document.getElementById('fpClose');

        // Close logic
        const closeFullProfile = () => fullProfileModalOverlay.classList.add('hidden');
        closeBtn.addEventListener('click', closeFullProfile);
        fullProfileModalOverlay.addEventListener('click', (e) => {
            if (e.target === fullProfileModalOverlay) closeFullProfile();
        });

        // Current User traits string array for matching
        const myTraits = window.CURRENT_USER_TRAITS || [];

        // Attach listeners to all view buttons
        document.querySelectorAll('.btn-view-profile').forEach(btn => {
            btn.addEventListener('click', () => {
                const friendStr = btn.getAttribute('data-friend');
                if (!friendStr) return;
                const friend = JSON.parse(friendStr);
                
                // Set Header
                titleEl.textContent = friend.name || "User";
                descEl.textContent = friend.bio ? `"${friend.bio}"` : '';
                imgEl.src = friend.profile_pic || 'https://i.pravatar.cc/150';
                
                // Set Contact (hide if missing)
                const phoneIcon = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>`;
                const instaIcon = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"></path></svg>`;
                const snapIcon = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path></svg>`;

                const contact = friend.contact || {};
                
                if (contact.phone) { phoneEl.innerHTML = `<span>${phoneIcon}</span> <a href="tel:${contact.phone}">${contact.phone}</a>`; phoneEl.classList.remove('hidden'); } else phoneEl.classList.add('hidden');
                if (contact.instagram) { instaEl.innerHTML = `<span>${instaIcon}</span> <a href="https://instagram.com/${contact.instagram}" target="_blank">@${contact.instagram}</a>`; instaEl.classList.remove('hidden'); } else instaEl.classList.add('hidden');
                if (contact.snapchat) { snapEl.innerHTML = `<span>${snapIcon}</span> <span>${contact.snapchat}</span>`; snapEl.classList.remove('hidden'); } else snapEl.classList.add('hidden');

                // Render Traits
                traitsContainer.innerHTML = '';
                
                const sections = [
                    { title: 'Interests', key: 'interests', sc_type: 'interest' },
                    { title: 'Talents', key: 'talents', sc_type: 'talent' },
                    { title: 'Hobbies', key: 'hobbies', sc_type: 'hobby' },
                    { title: 'Life Goals', key: 'life_aim', sc_type: 'life_aim' }
                ];
                
                sections.forEach(sec => {
                    const list = friend[sec.key] || [];
                    if (list.length === 0) return;

                    const secDiv = document.createElement('div');
                    secDiv.className = 'w-full';
                    secDiv.innerHTML = `<h4 class="font-bold uppercase tracking-widest text-blue-600 mb-3 text-sm">${sec.title}</h4>`;
                    
                    const flexWrap = document.createElement('div');
                    flexWrap.className = 'flex flex-col gap-4';

                    list.forEach(topic => {
                        const itemWrapper = document.createElement('div');
                        itemWrapper.className = 'flex flex-col gap-2 bg-white p-4 rounded-lg shadow-sm border border-gray-100';
                        
                        // Tag header
                        const tagDiv = document.createElement('div');
                        const isMatch = myTraits.includes(topic);
                        const baseBtnStyle = isMatch 
                            ? "bg-blue-500 text-white border-blue-500 shadow-md shadow-blue-500/20" 
                            : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200 hover:text-gray-800";
                            
                        tagDiv.innerHTML = `
                            <div class="flex items-center gap-2">
                                <span class="text-xs font-semibold px-3 py-1.5 rounded-full border transition-all select-none ${baseBtnStyle}">${topic}</span>
                                ${isMatch ? '<span class="text-[0.65rem] text-blue-500 font-bold tracking-wider uppercase flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span> MATCH</span>' : ''}
                            </div>
                        `;
                        itemWrapper.appendChild(tagDiv);
                        
                        // Check for attached mock Showcases!
                        const showcases = friend.showcases || [];
                        const matchedSC = showcases.find(s => s.type === sec.sc_type && s.topic === topic);
                        
                        if (matchedSC) {
                            const mediaDiv = document.createElement('div');
                            mediaDiv.className = 'mt-1';
                            
                            if (matchedSC.is_video) {
                                mediaDiv.innerHTML = `
                                    <video src="${matchedSC.file_url}" controls class="max-w-[500px] w-full max-h-[400px] rounded-lg object-contain shadow-md border border-gray-200 mt-2 bg-black/5"></video>
                                    <a href="${matchedSC.file_url}" target="_blank" class="text-blue-600 font-semibold text-sm hover:underline mt-2 w-fit flex items-center gap-1">
                                        <span class="text-lg leading-none">⛶</span> View Full Video
                                    </a>
                                `;
                            } else {
                                mediaDiv.innerHTML = `
                                    <img src="${matchedSC.file_url}" class="max-w-[500px] w-full max-h-[400px] rounded-lg object-contain shadow-md border border-gray-200 mt-2 bg-black/5" />
                                    <a href="${matchedSC.file_url}" target="_blank" class="text-blue-600 font-semibold text-sm hover:underline mt-2 w-fit flex items-center gap-1">
                                        <span class="text-lg leading-none">⛶</span> View Full Image
                                    </a>
                                `;
                            }
                            itemWrapper.appendChild(mediaDiv);
                        }
                        
                        flexWrap.appendChild(itemWrapper);
                    });
                    
                    secDiv.appendChild(flexWrap);
                    traitsContainer.appendChild(secDiv);
                });

                fullProfileModalOverlay.classList.remove('hidden');
            });
        });
    }
});
