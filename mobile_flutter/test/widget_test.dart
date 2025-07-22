import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mobile_flutter/main.dart';

void main() {
  testWidgets('TechMeetApp renders correctly', (WidgetTester tester) async {
    await tester.pumpWidget(const TechMeetApp());
    expect(find.text('Login'), findsOneWidget);
  });
}
