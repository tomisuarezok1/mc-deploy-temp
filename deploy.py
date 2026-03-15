#!/usr/bin/env python3
"""
Deploy script for CNBX Mission Control.
This script recreates all files from the project at the specified base path.
"""

import os
import sys
from pathlib import Path

BASE_PATH = "/docker/cnbx-mission-control/"

# Dictionary mapping relative file paths to their contents
FILES_CONTENT = {
    'Dockerfile': 'FROM node:20-alpine AS base\n\nFROM base AS deps\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\n\nFROM base AS builder\nWORKDIR /app\nCOPY --from=deps /app/node_modules ./node_modules\nCOPY . .\nRUN npm run build\n\nFROM base AS runner\nWORKDIR /app\nENV NODE_ENV=production\nRUN addgroup --system --gid 1001 nodejs\nRUN adduser --system --uid 1001 nextjs\nCOPY --from=builder /app/public ./public\nCOPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./\nCOPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static\nUSER nextjs\nEXPOSE 3000\nENV PORT=3000\nCMD ["node", "server.js"]\n':
