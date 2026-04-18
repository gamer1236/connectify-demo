from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from dummy_data import CURRENT_USER, NEARBY_USERS, FRIENDS, INTERESTS_LIST, TALENTS_LIST, HOBBIES_LIST, GOALS_LIST, ACTIVITY
import dummy_data
import os
import shutil
import random
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.secret_key = 'super_secret_demo_key'

@app.context_processor
def inject_globals():
    return dict(
        INTERESTS_LIST=INTERESTS_LIST,
        TALENTS_LIST=TALENTS_LIST,
        HOBBIES_LIST=HOBBIES_LIST,
        GOALS_LIST=GOALS_LIST,
        current_user=CURRENT_USER
    )

@app.route('/')
def index():
    return redirect(url_for('auth'))

@app.route('/auth', methods=['GET', 'POST'])
def auth():
    if request.method == 'POST':
        if 'fname' in request.form:
            fname = request.form.get('fname', '')
            lname = request.form.get('lname', '')
            session['user_email'] = request.form.get('email')
            session['user_name'] = f"{fname} {lname}".strip()
            return redirect(url_for('create_profile'))
        else:
            session['user_email'] = request.form.get('email')
            session['user_name'] = "User"
            # In a real app we might redirect to discovery, but let's go to profile if user not setup
            return redirect(url_for('discovery'))
            
    return render_template('auth.html')

def update_user_from_form(form, files=None):
    CURRENT_USER['name'] = form.get('full_name')
    CURRENT_USER['gender'] = form.get('gender')
    CURRENT_USER['interests'] = form.get('interests', '').split(',') if form.get('interests') else []
    CURRENT_USER['talents'] = form.get('talents', '').split(',') if form.get('talents') else []
    CURRENT_USER['hobbies'] = form.get('hobbies', '').split(',') if form.get('hobbies') else []
    CURRENT_USER['life_aim'] = form.get('life_aim', '').split(',') if form.get('life_aim') else []
    CURRENT_USER['bio'] = form.get('bio')
    CURRENT_USER['location'] = form.get('location')
    CURRENT_USER['profile_pic'] = "https://i.pravatar.cc/150?img=3"
    
    # Process Showcase data if present
    if 'showcases' not in CURRENT_USER:
        CURRENT_USER['showcases'] = []
    
    if files:
        # Define upload path
        username_safe = secure_filename(CURRENT_USER.get('name', 'user'))
        upload_folder = os.path.join(app.root_path, 'static', 'uploads', username_safe)
        os.makedirs(upload_folder, exist_ok=True)
        
        for key, file in files.items():
            if file and file.filename:
                if key.startswith('showcase_talent_file_'):
                    topic = key.replace('showcase_talent_file_', '')
                    filename = secure_filename(file.filename)
                    file.save(os.path.join(upload_folder, filename))
                    # Remove old showcase for this topic if exists
                    CURRENT_USER['showcases'] = [s for s in CURRENT_USER['showcases'] if not (s['type'] == 'talent' and s['topic'] == topic)]
                    CURRENT_USER['showcases'].append({'type': 'talent', 'topic': topic, 'file': f"{username_safe}/{filename}"})
                
                elif key.startswith('showcase_hobby_file_'):
                    topic = key.replace('showcase_hobby_file_', '')
                    filename = secure_filename(file.filename)
                    file.save(os.path.join(upload_folder, filename))
                    # Remove old showcase for this topic if exists
                    CURRENT_USER['showcases'] = [s for s in CURRENT_USER['showcases'] if not (s['type'] == 'hobby' and s['topic'] == topic)]
                    CURRENT_USER['showcases'].append({'type': 'hobby', 'topic': topic, 'file': f"{username_safe}/{filename}"})

@app.route('/create-profile', methods=['GET', 'POST'])
def create_profile():
    if request.method == 'POST':
        update_user_from_form(request.form, request.files)
        return redirect(url_for('discovery'))
    return render_template('create_profile.html')

@app.route('/profile', methods=['GET', 'POST'])
def profile():
    if request.method == 'POST':
        update_user_from_form(request.form, request.files)
        # Stay on profile page to reflect saves
        return redirect(url_for('profile'))
    return render_template('profile.html')

def auto_inject_matches(target_list):
    # Ensure current_user always has mock traits if profile was skipped in the demo
    if not CURRENT_USER.get('interests'):
        CURRENT_USER['interests'] = ["AI", "Design", "Machine Learning"]
    if not CURRENT_USER.get('talents'):
        CURRENT_USER['talents'] = ["Python", "Figma", "Public Speaking"]
    if not CURRENT_USER.get('hobbies'):
        CURRENT_USER['hobbies'] = ["Cooking", "Traveling"]
    if not CURRENT_USER.get('life_aim'):
        CURRENT_USER['life_aim'] = ["Found a Startup"]

    u_interests = CURRENT_USER.get('interests', [])
    u_talents   = CURRENT_USER.get('talents', [])
    u_hobbies   = CURRENT_USER.get('hobbies', [])
    u_goals     = CURRENT_USER.get('life_aim', [])

    for u in target_list:
        # Only inject a trait when there is NO existing intersection already —
        # and guard against duplicates by checking membership before append.
        if u_interests and not set(u_interests).intersection(u.get('interests', [])):
            pick = random.choice(u_interests)
            if pick not in u['interests']:
                u['interests'].append(pick)
        if u_talents and not set(u_talents).intersection(u.get('talents', [])):
            pick = random.choice(u_talents)
            if pick not in u['talents']:
                u['talents'].append(pick)
        if u_hobbies and not set(u_hobbies).intersection(u.get('hobbies', [])):
            pick = random.choice(u_hobbies)
            if pick not in u['hobbies']:
                u['hobbies'].append(pick)
        if u_goals and not set(u_goals).intersection(u.get('life_aim', [])):
            pick = random.choice(u_goals)
            if pick not in u['life_aim']:
                u['life_aim'].append(pick)

@app.route('/discovery')
def discovery():
    auto_inject_matches(NEARBY_USERS)
    return render_template('discovery.html', nearby_users=NEARBY_USERS)

@app.route('/network')
def network():
    auto_inject_matches(FRIENDS)
    return render_template('network.html', friends=FRIENDS)

@app.route('/activity')
def activity():
    from datetime import datetime
    def parse_dt(m):
        try:
            # Convert 12-hour time like "3:30 PM" to 24h for proper sorting
            return datetime.strptime(f"{m['date']} {m['time']}", "%Y-%m-%d %I:%M %p")
        except Exception:
            return datetime.min
    ACTIVITY['upcoming_meetups'].sort(key=parse_dt)
    return render_template('activity.html', activity=ACTIVITY)

@app.route('/api/activity-action', methods=['POST'])
def activity_action():
    from datetime import datetime
    data     = request.json
    action   = data.get('action')
    item_id  = data.get('id')
    category = data.get('category')

    if category not in ACTIVITY:
        return jsonify({'status': 'error', 'message': 'Invalid category'}), 400

    # Find the item before removing it
    item = next((x for x in ACTIVITY[category] if x['id'] == item_id), None)

    # Remove from source list
    ACTIVITY[category] = [x for x in ACTIVITY[category] if x['id'] != item_id]

    if action == 'accept' and category == 'meetup_requests' and item:
        # Build and append upcoming meetup entry
        new_upcoming = {
            'id': f"um_{item_id}",
            'with_name': item['from_name'],
            'with_pic':  item['from_pic'],
            'date':  item['date'],
            'time':  item['time'],
            'place': item['place'],
            'note':  item.get('note', ''),
            'status': 'confirmed'
        }
        ACTIVITY['upcoming_meetups'].append(new_upcoming)
        # Re-sort ascending
        def parse_dt(m):
            try:
                return datetime.strptime(f"{m['date']} {m['time']}", "%Y-%m-%d %I:%M %p")
            except Exception:
                return datetime.min
        ACTIVITY['upcoming_meetups'].sort(key=parse_dt)
        # Return the new card data to JS so it can inject it live
        return jsonify({'status': 'ok', 'message': 'Meetup confirmed!', 'new_upcoming': new_upcoming})

    if action == 'accept':
        msg = 'Connection request accepted!'
    else:
        msg = 'Request declined.'

    return jsonify({'status': 'ok', 'message': msg})


@app.route('/api/send-request', methods=['POST'])
def send_request():
    data = request.json
    action_type = data.get('type')
    target_id = data.get('target_id')
    
    if action_type == 'friend':
        return jsonify({"status": "success", "message": "Friend request sent!"})
    elif action_type == 'meetup':
        return jsonify({"status": "success", "message": f"Meetup scheduled on {data.get('date')} at {data.get('time')} in {data.get('place')}!"})
    
    return jsonify({"status": "error", "message": "Invalid request"}), 400

@app.route('/logout')
def logout():
    # Cleanup user's showcase files
    username_safe = secure_filename(CURRENT_USER.get('name', 'user'))
    user_upload_dir = os.path.join(app.root_path, 'static', 'uploads', username_safe)
    if os.path.exists(user_upload_dir):
        shutil.rmtree(user_upload_dir)
    
    # Reset in-memory states (optional for demo, but good practice here)
    if 'showcases' in CURRENT_USER:
        CURRENT_USER['showcases'] = []
    session.clear()
    return redirect(url_for('auth'))

if __name__ == '__main__':
    app.run(debug=True)
