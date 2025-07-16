import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:techmeet_mobile/main.dart';

void main() {
  testWidgets('TechMeetApp renders correctly', (WidgetTester tester) async {
    // Build the app and trigger a frame.
    await tester.pumpWidget(TechMeetApp());

    // Verify that the Login screen is displayed initially (since _token is null).
    expect(find.text('Login'), findsOneWidget);
  });
}
