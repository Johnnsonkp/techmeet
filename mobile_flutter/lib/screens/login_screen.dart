import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';

class LoginScreen extends StatefulWidget {
  final Function(String) onLogin;
  const LoginScreen({Key? key, required this.onLogin}) : super(key: key);

  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  bool _isLoading = false;
  bool _showRegisterForm = false;
  final GoogleSignIn _googleSignIn = GoogleSignIn(
    scopes: ['email'],
    clientId:
        '298167153207-tki4jcpo5cdsil2hl1i2hu1ba94fv30r.apps.googleusercontent.com',
  );
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _firstNameController = TextEditingController();
  final _lastNameController = TextEditingController();
  final _jobTitleController = TextEditingController();
  final _employmentStatusController = TextEditingController();
  final _technicalSkillsController = TextEditingController();

  Future<void> _loginWithEmail() async {
    setState(() => _isLoading = true);
    try {
      final response = await http.post(
        Uri.parse('http://10.0.1.86:5328/api/v1/users/login'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'email': _emailController.text,
          'password': _passwordController.text,
        }),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        Provider.of<AuthProvider>(context, listen: false)
            .setToken(data['token'], data['user']['id']);
        widget.onLogin(data['token']);
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Logged in successfully')),
        );
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
              content:
                  Text(jsonDecode(response.body)['message'] ?? 'Login failed')),
        );
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Failed to connect to backend')),
      );
    } finally {
      setState(() => _isLoading = false);
    }
  }

  Future<void> _loginWithGoogle() async {
    setState(() => _isLoading = true);
    try {
      final GoogleSignInAccount? googleUser = await _googleSignIn.signIn();
      if (googleUser == null) {
        setState(() => _isLoading = false);
        return;
      }
      final GoogleSignInAuthentication googleAuth =
          await googleUser.authentication;
      final response = await http.post(
        Uri.parse('http://10.0.1.86:5328/api/v1/users/google-login'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'id_token': googleAuth.idToken,
        }),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        Provider.of<AuthProvider>(context, listen: false)
            .setToken(data['token'], data['user']['id']);
        widget.onLogin(data['token']);
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Logged in successfully')),
        );
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
              content:
                  Text(jsonDecode(response.body)['error'] ?? 'Login failed')),
        );
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Failed to connect to backend')),
      );
    } finally {
      setState(() => _isLoading = false);
    }
  }

  Future<void> _register() async {
    setState(() => _isLoading = true);
    try {
      final response = await http.post(
        Uri.parse('http://10.0.1.86:5328/api/v1/users/sign_up'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'first_name': _firstNameController.text,
          'last_name': _lastNameController.text,
          'email': _emailController.text,
          'password': _passwordController.text,
          'job_title': _jobTitleController.text,
          'employment_status': _employmentStatusController.text,
          'technical_skills': jsonDecode(_technicalSkillsController.text.isEmpty
              ? '[]'
              : _technicalSkillsController.text),
        }),
      );

      if (response.statusCode == 201) {
        final data = jsonDecode(response.body);
        Provider.of<AuthProvider>(context, listen: false)
            .setToken(data['token'], data['user']['id']);
        widget.onLogin(data['token']);
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Registered successfully')),
        );
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
              content: Text(jsonDecode(response.body)['message'] ??
                  'Registration failed')),
        );
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Failed to connect to backend')),
      );
    } finally {
      setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Login')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              if (_showRegisterForm) ...[
                TextField(
                  controller: _firstNameController,
                  decoration: const InputDecoration(labelText: 'First Name'),
                ),
                TextField(
                  controller: _lastNameController,
                  decoration: const InputDecoration(labelText: 'Last Name'),
                ),
                TextField(
                  controller: _emailController,
                  decoration: const InputDecoration(labelText: 'Email'),
                ),
                TextField(
                  controller: _passwordController,
                  decoration: const InputDecoration(labelText: 'Password'),
                  obscureText: true,
                ),
                TextField(
                  controller: _jobTitleController,
                  decoration: const InputDecoration(labelText: 'Job Title'),
                ),
                TextField(
                  controller: _employmentStatusController,
                  decoration:
                      const InputDecoration(labelText: 'Employment Status'),
                ),
                TextField(
                  controller: _technicalSkillsController,
                  decoration: const InputDecoration(
                      labelText:
                          'Technical Skills (JSON array, e.g., ["JavaScript", "Python"])'),
                ),
                const SizedBox(height: 20),
                ElevatedButton(
                  onPressed: _register,
                  child: const Text('Register'),
                ),
                const SizedBox(height: 10),
                TextButton(
                  onPressed: () => setState(() => _showRegisterForm = false),
                  child: const Text('Back to Login'),
                ),
              ] else ...[
                TextField(
                  controller: _emailController,
                  decoration: const InputDecoration(labelText: 'Email'),
                ),
                TextField(
                  controller: _passwordController,
                  decoration: const InputDecoration(labelText: 'Password'),
                  obscureText: true,
                ),
                const SizedBox(height: 20),
                _isLoading
                    ? const CircularProgressIndicator()
                    : Column(
                        children: [
                          ElevatedButton(
                            onPressed: _loginWithEmail,
                            child: const Text('Login'),
                          ),
                          const SizedBox(height: 10),
                          ElevatedButton(
                            onPressed: _loginWithGoogle,
                            child: const Text('Sign in with Google'),
                          ),
                          const SizedBox(height: 10),
                          TextButton(
                            onPressed: () =>
                                setState(() => _showRegisterForm = true),
                            child: const Text('Register'),
                          ),
                        ],
                      ),
              ],
            ],
          ),
        ),
      ),
    );
  }
}
