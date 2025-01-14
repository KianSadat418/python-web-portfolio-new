from flask import Flask, render_template, request, redirect

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/submit-form", methods=["POST"])
def submit_form():
    name = request.form.get("name")
    email = request.form.get("email")
    message = request.form.get("message")
    # Add logic to handle form submission (e.g., save to database, send email)
    print(f"Message received: {name}, {email}, {message}")
    return redirect("/")
