import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class ProfileSetupScreen extends StatefulWidget {
  final String token;
  const ProfileSetupScreen({Key? key, required this.token}) : super(key: key);

  @override
  _ProfileSetupScreenState createState() => _ProfileSetupScreenState();
}

class _ProfileSetupScreenState extends State<ProfileSetupScreen> {
  final _jobTitleController = TextEditingController();
  final _skillsController = TextEditingController();
  final _descriptionController = TextEditingController();
  bool _isLoading = false;

  Future<void> _saveProfile() async {
    setState(() => _isLoading = true);
    try {
      final response = await http.post(
        Uri.parse('http://localhost:5328/api/v1/profiles/'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ${widget.token}',
        },
        body: jsonEncode({
          'job_title': _jobTitleController.text,
          'skills': jsonDecode(
              _skillsController.text.isEmpty ? '[]' : _skillsController.text),
          'description': _descriptionController.text,
          'personality': {},
          'tags': [],
        }),
      );

      if (response.statusCode == 201) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Profile created successfully')),
        );
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
              content: Text(jsonDecode(response.body)['error'] ??
                  'Failed to save profile')),
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
      appBar: AppBar(title: const Text('Profile Setup')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              controller: _jobTitleController,
              decoration: const InputDecoration(labelText: 'Job Title'),
            ),
            TextField(
              controller: _skillsController,
              decoration: const InputDecoration(
                  labelText:
                      'Skills (JSON array, e.g., ["JavaScript", "Python"])'),
            ),
            TextField(
              controller: _descriptionController,
              decoration: const InputDecoration(labelText: 'Description'),
              maxLines: 4,
            ),
            const SizedBox(height: 20),
            _isLoading
                ? const CircularProgressIndicator()
                : ElevatedButton(
                    onPressed: _saveProfile,
                    child: const Text('Save Profile'),
                  ),
          ],
        ),
      ),
    );
  }
}
