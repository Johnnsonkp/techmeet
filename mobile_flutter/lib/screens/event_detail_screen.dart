import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:provider/provider.dart';
import 'package:url_launcher/url_launcher.dart';
import '../providers/auth_provider.dart';

class EventDetailScreen extends StatefulWidget {
  final String eventId;
  const EventDetailScreen({Key? key, required this.eventId}) : super(key: key);

  @override
  _EventDetailScreenState createState() => _EventDetailScreenState();
}

class _EventDetailScreenState extends State<EventDetailScreen> {
  Map<String, dynamic>? _event;
  bool _isLoading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _fetchEventDetails();
  }

  Future<void> _fetchEventDetails() async {
    try {
      final response = await http.get(
          Uri.parse('http://10.0.1.86:5328/api/v1/events/${widget.eventId}'));
      if (response.statusCode == 200) {
        setState(() {
          _event = jsonDecode(response.body);
          _isLoading = false;
        });
      } else {
        setState(() {
          _error = 'Failed to load event details';
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

  Future<void> _addToCalendar() async {
    try {
      final authProvider = Provider.of<AuthProvider>(context, listen: false);
      final response = await http.post(
        Uri.parse('http://10.0.1.86:5328/api/v1/events/${widget.eventId}/book'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ${authProvider.token}',
        },
        body: jsonEncode({'user_id': authProvider.userId}),
      );
      if (response.statusCode == 201) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Event added to calendar')),
        );
        Navigator.pushNamed(context, '/dashboard');
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Failed to book event')),
        );
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Failed to connect to backend')),
      );
    }
  }

  Future<void> _bookOnEventbrite() async {
    try {
      final response = await http.get(
        Uri.parse(
            'http://10.0.1.86:5328/api/v1/events/eventbrite-link/${widget.eventId}'),
      );
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        final url = data['eventbrite_url'];
        if (await canLaunchUrl(Uri.parse(url))) {
          await launchUrl(Uri.parse(url));
        } else {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Could not launch Eventbrite URL')),
          );
        }
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Failed to fetch Eventbrite link')),
        );
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Failed to connect to backend')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Event Details')),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: _isLoading
            ? const Center(child: CircularProgressIndicator(color: Colors.blue))
            : _error != null
                ? Center(
                    child: Text(
                      _error!,
                      style: const TextStyle(color: Colors.red, fontSize: 18),
                      textAlign: TextAlign.center,
                    ),
                  )
                : Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        _event!['name'],
                        style: const TextStyle(
                            fontSize: 24, fontWeight: FontWeight.bold),
                      ),
                      const SizedBox(height: 10),
                      Text(
                        _event!['datetime'],
                        style:
                            const TextStyle(fontSize: 16, color: Colors.grey),
                      ),
                      const SizedBox(height: 10),
                      Text(
                        _event!['description'] ?? 'No description available',
                        style: const TextStyle(fontSize: 16),
                      ),
                      const SizedBox(height: 20),
                      Row(
                        children: [
                          ElevatedButton(
                            onPressed: _addToCalendar,
                            child: const Text('Add to Calendar'),
                          ),
                          const SizedBox(width: 10),
                          ElevatedButton(
                            onPressed: _bookOnEventbrite,
                            child: const Text('Book on Eventbrite'),
                          ),
                        ],
                      ),
                    ],
                  ),
      ),
    );
  }
}
