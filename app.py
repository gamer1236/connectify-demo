from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from dummy_data import CURRENT_USER, NEARBY_USERS, FRIENDS, INTERESTS_LIST, TALENTS_LIST, HOBBIES_LIST, GOALS_LIST
import dummy_data

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

def update_user_from_form(form):
    CURRENT_USER['name'] = form.get('full_name')
    CURRENT_USER['gender'] = form.get('gender')
    CURRENT_USER['interests'] = form.get('interests', '').split(',') if form.get('interests') else []
    CURRENT_USER['talents'] = form.get('talents', '').split(',') if form.get('talents') else []
    CURRENT_USER['hobbies'] = form.get('hobbies', '').split(',') if form.get('hobbies') else []
    CURRENT_USER['life_aim'] = form.get('life_aim', '').split(',') if form.get('life_aim') else []
    CURRENT_USER['bio'] = form.get('bio')
    CURRENT_USER['location'] = form.get('location')
    CURRENT_USER['profile_pic'] = "https://i.pravatar.cc/150?img=3"

@app.route('/create-profile', methods=['GET', 'POST'])
def create_profile():
    if request.method == 'POST':
        update_user_from_form(request.form)
        return redirect(url_for('discovery'))
    return render_template('create_profile.html')

@app.route('/profile', methods=['GET', 'POST'])
def profile():
    if request.method == 'POST':
        update_user_from_form(request.form)
        # Stay on profile page to reflect saves
        return redirect(url_for('profile'))
    return render_template('profile.html')

@app.route('/discovery')
def discovery():
    return render_template('discovery.html', nearby_users=NEARBY_USERS)

@app.route('/network')
def network():
    return render_template('network.html', friends=FRIENDS)

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

if __name__ == '__main__':
    app.run(debug=True)
