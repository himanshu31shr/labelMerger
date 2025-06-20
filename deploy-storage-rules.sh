#!/bin/bash

# Deploy Firebase Storage Rules
echo "Deploying Firebase Storage Rules..."
firebase deploy --only storage

echo "Storage rules deployed successfully!" 