import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'screens/login_screen.dart';
import 'screens/profile_setup_screen.dart';

void main() {
  runApp(const TechMeetApp());
}

class TechMeetApp extends StatefulWidget {
  const TechMeetApp({super.key});

  @override
  _TechMeetAppState createState() => _TechMeetAppState();
}

class _TechMeetAppState extends State<TechMeetApp> {
  String? _token;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: _token == null
          ? LoginScreen(onLogin: (token) {
              setState(() => _token = token);
            })
          : DefaultTabController(
              length: 2,
              child: Scaffold(
                appBar: AppBar(
                  title: const Text('TechMeet'),
                  bottom: const TabBar(
                    tabs: [
                      Tab(icon: Icon(Icons.calendar_today), text: 'Events'),
                      Tab(icon: Icon(Icons.person), text: 'Profile'),
                    ],
                  ),
                ),
                body: TabBarView(
                  children: [
                    EventScreen(),
                    ProfileSetupScreen(token: _token!),
                  ],
                ),
              ),
            ),
    );
  }
}

class EventScreen extends StatefulWidget {
  const EventScreen({super.key});

  @override
  _EventScreenState createState() => _EventScreenState();
}

class _EventScreenState extends State<EventScreen> {
  List<dynamic> _events = [];
  bool _isLoading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _fetchEvents();
  }

  Future<void> _fetchEvents() async {
    try {
      final response =
          await http.get(Uri.parse('http://localhost:5328/api/v1/events'));
      if (response.statusCode == 200) {
        setState(() {
          _events = jsonDecode(response.body);
          _isLoading = false;
        });
      } else {
        setState(() {
          _error = 'Failed to load events';
          _isLoading = false;
        });
      }
    } catch (e) {
      setState(() {
        _error = 'Failed to connect to backend';
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return const Center(child: CircularProgressIndicator());
    }
    if (_error != null) {
      return Center(
        child: Text(_error!,
            style: const TextStyle(color: Colors.red, fontSize: 18)),
      );
    }
    return ListView.builder(
      padding: const EdgeInsets.all(16.0),
      itemCount: _events.length,
      itemBuilder: (context, index) {
        final event = _events[index];
        return ListTile(
          title: Text(event['title']),
          subtitle: Text(event['date']),
        );
      },
    );
  }
}
