import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'screens/login_screen.dart';
import 'screens/home_screen.dart';
import 'screens/profile_setup_screen.dart';
import 'screens/dashboard_screen.dart';
import 'screens/event_detail_screen.dart';
import 'providers/auth_provider.dart';

void main() {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()),
      ],
      child: const TechMeetApp(),
    ),
  );
}

class TechMeetApp extends StatefulWidget {
  const TechMeetApp({super.key});

  @override
  _TechMeetAppState createState() => _TechMeetAppState();
}

class _TechMeetAppState extends State<TechMeetApp> {
  @override
  Widget build(BuildContext context) {
    final authProvider = Provider.of<AuthProvider>(context);
    return MaterialApp(
      initialRoute: authProvider.token == null ? '/login' : '/home',
      routes: {
        '/login': (context) => LoginScreen(onLogin: (token) {
              Navigator.pushReplacementNamed(context, '/home');
            }),
        '/home': (context) => const HomeScreen(),
        '/dashboard': (context) => const DashboardScreen(),
        '/profile': (context) => ProfileSetupScreen(token: authProvider.token!),
        '/event': (context) => const EventDetailScreen(eventId: ''),
      },
      home: authProvider.token == null
          ? LoginScreen(onLogin: (token) {
              Navigator.pushReplacementNamed(context, '/home');
            })
          : DefaultTabController(
              length: 3,
              child: Scaffold(
                appBar: AppBar(
                  title: const Text('TechMeet'),
                  bottom: const TabBar(
                    tabs: [
                      Tab(icon: Icon(Icons.home), text: 'Home'),
                      Tab(icon: Icon(Icons.calendar_today), text: 'Dashboard'),
                      Tab(icon: Icon(Icons.person), text: 'Profile'),
                    ],
                    labelColor: Colors.black,
                    indicatorColor: Colors.blue,
                  ),
                ),
                body: TabBarView(
                  children: [
                    const HomeScreen(),
                    const DashboardScreen(),
                    ProfileSetupScreen(token: authProvider.token!),
                  ],
                ),
              ),
            ),
    );
  }
}
