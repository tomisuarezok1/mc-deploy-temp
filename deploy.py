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
