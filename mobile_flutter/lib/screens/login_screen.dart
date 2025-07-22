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
    scopes: [
      'email',
      'https://www.googleapis.com/auth/calendar.events',
    ],
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
      print('Login response: ${response.statusCode} ${response.body}');
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
      print('Network error: $e');
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
      await _googleSignIn.signOut(); // Clear any previous session
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
      print('Google login response: ${response.statusCode} ${response.body}');
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
      print('Google Sign-In error: $e');
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
      print('Register response: ${response.statusCode} ${response.body}');
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
      print('Network error: $e');
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
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 32.0),
          child: Center(
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 400),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  if (_showRegisterForm) ...[
                    TextField(
                      controller: _firstNameController,
                      decoration: InputDecoration(
                        labelText: 'First Name',
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(8.0),
                        ),
                      ),
                    ),
                    const SizedBox(height: 16),
                    TextField(
                      controller: _lastNameController,
                      decoration: InputDecoration(
                        labelText: 'Last Name',
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(8.0),
                        ),
                      ),
                    ),
                    const SizedBox(height: 16),
                    TextField(
                      controller: _emailController,
                      decoration: InputDecoration(
                        labelText: 'Email',
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(8.0),
                        ),
                      ),
                    ),
                    const SizedBox(height: 16),
                    TextField(
                      controller: _passwordController,
                      decoration: InputDecoration(
                        labelText: 'Password',
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(8.0),
                        ),
                      ),
                      obscureText: true,
                    ),
                    const SizedBox(height: 16),
                    TextField(
                      controller: _jobTitleController,
                      decoration: InputDecoration(
                        labelText: 'Job Title',
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(8.0),
                        ),
                      ),
                    ),
                    const SizedBox(height: 16),
                    TextField(
                      controller: _employmentStatusController,
                      decoration: InputDecoration(
                        labelText: 'Employment Status',
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(8.0),
                        ),
                      ),
                    ),
                    const SizedBox(height: 16),
                    TextField(
                      controller: _technicalSkillsController,
                      decoration: InputDecoration(
                        labelText:
                            'Technical Skills (JSON array, e.g., ["JavaScript", "Python"])',
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(8.0),
                        ),
                      ),
                    ),
                    const SizedBox(height: 20),
                    ElevatedButton(
                      onPressed: _register,
                      style: ElevatedButton.styleFrom(
                        padding: const EdgeInsets.symmetric(vertical: 16.0),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(8.0),
                        ),
                      ),
                      child: const Text('Register',
                          style: TextStyle(fontSize: 16)),
                    ),
                    const SizedBox(height: 10),
                    TextButton(
                      onPressed: () =>
                          setState(() => _showRegisterForm = false),
                      child: const Text('Back to Login',
                          style: TextStyle(fontSize: 14)),
                    ),
                  ] else ...[
                    TextField(
                      controller: _emailController,
                      decoration: InputDecoration(
                        labelText: 'Email',
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(8.0),
                        ),
                      ),
                    ),
                    const SizedBox(height: 16),
                    TextField(
                      controller: _passwordController,
                      decoration: InputDecoration(
                        labelText: 'Password',
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(8.0),
                        ),
                      ),
                      obscureText: true,
                    ),
                    const SizedBox(height: 20),
                    _isLoading
                        ? const Center(child: CircularProgressIndicator())
                        : Column(
                            crossAxisAlignment: CrossAxisAlignment.stretch,
                            children: [
                              ElevatedButton(
                                onPressed: _loginWithEmail,
                                style: ElevatedButton.styleFrom(
                                  padding: const EdgeInsets.symmetric(
                                      vertical: 16.0),
                                  shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(8.0),
                                  ),
                                ),
                                child: const Text('Login',
                                    style: TextStyle(fontSize: 16)),
                              ),
                              const SizedBox(height: 10),
                              ElevatedButton(
                                onPressed: _loginWithGoogle,
                                style: ElevatedButton.styleFrom(
                                  padding: const EdgeInsets.symmetric(
                                      vertical: 16.0),
                                  shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(8.0),
                                  ),
                                ),
                                child: const Text('Sign in with Google',
                                    style: TextStyle(fontSize: 16)),
                              ),
                              const SizedBox(height: 10),
                              TextButton(
                                onPressed: () =>
                                    setState(() => _showRegisterForm = true),
                                child: const Text('Register',
                                    style: TextStyle(fontSize: 14)),
                              ),
                            ],
                          ),
                  ],
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
