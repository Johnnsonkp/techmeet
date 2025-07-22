from app import create_app
from app.api.v1 import api
from app.api.v1.routes.user import api as users_ns
from app.api.v1.routes.event import api as events_ns

app = create_app('development')

with app.app_context():
    api.init_app(app)
    api.add_namespace(users_ns)
    api.add_namespace(events_ns)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5328)