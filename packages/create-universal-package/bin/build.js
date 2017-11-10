#!/usr/bin/env node

const args = require('args');
args
  .option('dir', 'Path to package dir', process.cwd())
  .option('skip-preflight', 'Skip preflight check', false)
  .option('tests', 'Build tests', false)
  .option('tests-only', 'Build test bundles only', false);

const flags = args.parse(process.argv);

const build = require('../lib/build.js');
const jobs = build(flags, {node: true, browser: true}, !flags.skipPreflight);

const logger = process.stdout.isTTY
  ? require('./logger.js')
  : require('./logger-ci.js');

logger(jobs);
