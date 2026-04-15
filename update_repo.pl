#!/usr/bin/perl
use strict;
use warnings;

# Commands to execute
my @commands = (
    'git add .',
    'git commit -m "update"',
    'git pull origin main',
    'git push origin main'
);

foreach my $cmd (@commands) {
    print "Running: $cmd\n";
    system($cmd) == 0
        or die "Failed to execute: $cmd\n";
}

print "All commands executed successfully.\n";
