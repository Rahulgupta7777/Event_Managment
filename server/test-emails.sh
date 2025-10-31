#!/bin/bash

# Email System Test Script
# This script tests all email templates by sending them to hhirawat5@gmail.com

echo "🚀 Starting Email System Test..."
echo "================================"
echo ""

# Check if server is running
if ! curl -s http://localhost:3300/ > /dev/null; then
    echo "❌ Server is not running!"
    echo "Please start the server with: npm run dev"
    exit 1
fi

echo "✅ Server is running"
echo ""

# Test Welcome Email
echo "📧 Testing Welcome Email..."
curl -s http://localhost:3300/api/test/email/welcome | jq '.'
echo ""
sleep 2

# Test Verification Email
echo "✅ Testing Verification Email..."
curl -s http://localhost:3300/api/test/email/verification | jq '.'
echo ""
sleep 2

# Test Password Reset Email
echo "🔐 Testing Password Reset Email..."
curl -s http://localhost:3300/api/test/email/password-reset | jq '.'
echo ""
sleep 2

# Test Event Invitation Email
echo "🎊 Testing Event Invitation Email..."
curl -s http://localhost:3300/api/test/email/event-invitation | jq '.'
echo ""

echo "================================"
echo "✨ All tests completed!"
echo ""
echo "📬 Check your inbox at: hhirawat5@gmail.com"
echo "💡 Don't forget to check spam folder!"
echo ""
echo "To test all at once, run:"
echo "curl http://localhost:3300/api/test/email/all | jq '.'"
