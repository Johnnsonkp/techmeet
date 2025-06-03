"""OAuth Connections Model Route"""

from flask_restx import Namespace, Resource


api = Namespace('oauth_connection', description='OAuth connections operations')


@api.route('/login', methods=['GET', 'POST', 'OPTIONS'])
class Oauth(Resource):
    def get(self):
        """Retreive all oauth_connections"""

        """Testing the endpoint"""
        test_user_data = {
            'username': 'testuser',
            'email': 'testuser@example.com',
            'password': 'securepassword123',
            'date': "2025-06-05"
        }

        return test_user_data