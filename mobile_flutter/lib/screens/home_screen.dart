import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'event_detail_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  List<dynamic> _events = [];
  List<dynamic> _filteredEvents = [];
  bool _isLoading = true;
  String? _error;
  final _searchController = TextEditingController();
  final List<Map<String, String>> mockEvents = [
    {'id': '1', 'name': 'Mock Event 1', 'datetime': '2025-07-15'},
    {'id': '2', 'name': 'Mock Event 2', 'datetime': '2025-07-20'},
  ];

  @override
  void initState() {
    super.initState();
    _fetchEvents();
    _searchController.addListener(_filterEvents);
  }

  Future<void> _fetchEvents() async {
    try {
      final response =
          await http.get(Uri.parse('http://10.0.1.86:5328/api/v1/events'));
      if (response.statusCode == 200) {
        setState(() {
          _events = jsonDecode(response.body)['events'];
          _filteredEvents = _events;
          _isLoading = false;
        });
      } else {
        setState(() {
          _events = mockEvents;
          _filteredEvents = mockEvents;
          _error = 'Failed to load events';
          _isLoading = false;
        });
      }
    } catch (e) {
      setState(() {
        _events = mockEvents;
        _filteredEvents = mockEvents;
        _error = 'Failed to connect to backend';
        _isLoading = false;
      });
    }
  }

  Future<void> _filterEvents() async {
    final query = _searchController.text.toLowerCase();
    try {
      final response = await http.get(
          Uri.parse('http://10.0.1.86:5328/api/v1/events/search?q=$query'));
      if (response.statusCode == 200) {
        setState(() {
          _filteredEvents = jsonDecode(response.body)['events'];
        });
      } else {
        setState(() {
          _filteredEvents = mockEvents;
          _error = 'Failed to search events';
        });
      }
    } catch (e) {
      setState(() {
        _filteredEvents = mockEvents;
        _error = 'Failed to connect to backend';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('TechMeet Home'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          children: [
            TextField(
              controller: _searchController,
              decoration: const InputDecoration(
                labelText: 'Search Events (e.g., Python)',
                prefixIcon: Icon(Icons.search),
              ),
            ),
            const SizedBox(height: 20),
            _isLoading
                ? const Center(
                    child: CircularProgressIndicator(color: Colors.blue))
                : _error != null
                    ? Center(
                        child: Text(
                          _error!,
                          style:
                              const TextStyle(color: Colors.red, fontSize: 18),
                          textAlign: TextAlign.center,
                        ),
                      )
                    : Expanded(
                        child: ListView.builder(
                          itemCount: _filteredEvents.length,
                          itemBuilder: (context, index) {
                            final event = _filteredEvents[index];
                            return GestureDetector(
                              onTap: () {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (context) => EventDetailScreen(
                                        eventId: event['id'].toString()),
                                  ),
                                );
                              },
                              child: Container(
                                padding: const EdgeInsets.all(10.0),
                                decoration: const BoxDecoration(
                                  border: Border(
                                      bottom: BorderSide(color: Colors.grey)),
                                ),
                                child: Text(
                                  '${event['name']} - ${event['datetime']}',
                                  style: const TextStyle(
                                      fontSize: 16, color: Colors.black),
                                ),
                              ),
                            );
                          },
                        ),
                      ),
          ],
        ),
      ),
    );
  }
}
