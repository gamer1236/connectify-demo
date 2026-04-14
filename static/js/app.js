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
        document.querySelectorAll('.tag-badge-selectable').forEach(badge => {
            badge.addEventListener('click', () => {
                badge.classList.toggle('active');
                badge.classList.toggle('bg-blue-500');
                badge.classList.toggle('text-white');
                badge.classList.toggle('border-blue-500');
                badge.classList.toggle('text-gray-600');
                badge.classList.toggle('border-blue-200');
            });
        });

        profileForm.addEventListener('submit', (e) => {
            // Before submitting, collect active tags into hidden inputs
            const mapTags = (containerId, hiddenId) => {
                const container = document.getElementById(containerId);
                if(container) {
                    const actives = Array.from(container.querySelectorAll('.active')).map(el => el.getAttribute('data-val'));
                    document.getElementById(hiddenId).value = actives.join(',');
                }
            };
            mapTags('cat_interests', 'hidden_interests');
            mapTags('cat_talents', 'hidden_talents');
            mapTags('cat_hobbies', 'hidden_hobbies');
            mapTags('cat_life_aim', 'hidden_life_aim');
        });
    }

    /* ════════════════════════════════════════
       2. DISCOVERY MAP LAYOUT & SIMILARITY
       ════════════════════════════════════════ */
    const discoveryMap = document.getElementById('discoveryMap');
    if (discoveryMap) {
        const nodes = document.querySelectorAll('.nearby-node');
        const radiusMap = 220;
        const angleStep = (2 * Math.PI) / nodes.length;
        
        nodes.forEach((node, index) => {
            const jitterRadius = radiusMap + (Math.random() * 80 - 40); 
            const angle = index * angleStep + (Math.random() * 0.4 - 0.2);
            const x = Math.cos(angle) * jitterRadius;
            const y = Math.sin(angle) * jitterRadius;
            
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
});
