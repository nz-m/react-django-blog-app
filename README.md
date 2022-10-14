# react-django-blog-app

## Django project setup
1. Clone the project

2. Go to the project directory (backend)
```bash
cd backend
```
3. Create a virtual environment and activate it (Windows)
```bash
python -m venv env
```
```bash
env\Scripts\activate
```
4. Install dependencies

```bash
pip install -r requirements.txt
```
5. Migrate
```bash
python manage.py migrate
```
6. Create admin/superuser
```bash
python manage.py createsuperuser
```
7. Finally run the project
```bash
python manage.py runserver
```
Now the project should be running on http://127.0.0.1:8000/
