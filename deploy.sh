#!/bin/bash
ssh deploy@<IP> 'cd ~/app && git pull && npm install && npm run build && sudo systemctl restart filosofisk-forum'
