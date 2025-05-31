"""OAuth Connections Model Route"""

from flask_restx import Namespace, Resource


api = Namespace('oauth_connection', description='OAuth connections operations')


@api.route('/login', methods=['GET', 'POST', 'OPTIONS'])
class Oauth(Resource):
    def get(self):
        """Retreive all oauth_connections"""

        print("oauth_connections route")