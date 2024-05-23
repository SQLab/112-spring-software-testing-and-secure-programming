Name: Chia-Yang Huang
ID: 511559025

### Fuzz Monitor
```
 american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 3 min, 24 sec       │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 1 min, 19 sec       │  total paths : 6      │
│ last uniq crash : 0 days, 0 hrs, 1 min, 32 sec       │ uniq crashes : 1      │
│  last uniq hang : 0 days, 0 hrs, 1 min, 12 sec       │   uniq hangs : 3      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 0 (0.00%)         │    map density : 0.04% / 0.05%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 1.43 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : bitflip 2/1           │ favored paths : 1 (16.67%)             │
│ stage execs : 99/223 (44.39%)       │  new edges on : 2 (33.33%)             │
│ total execs : 411                   │ total crashes : 10 (1 unique)          │
│  exec speed : 0.00/sec (zzzz...)    │  total tmouts : 35 (3 unique)          │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 6/224, 0/0, 0/0                       │    levels : 2          │
│  byte flips : 0/0, 0/0, 0/0                         │   pending : 6          │
│ arithmetics : 0/0, 0/0, 0/0                         │  pend fav : 1          │
│  known ints : 0/0, 0/0, 0/0                         │ own finds : 5          │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/0, 0/0                              │ stability : 100.00%    │
│        trim : 100.00%/37, n/a                       ├────────────────────────┘
└─────────────────────────────────────────────────────┘          [cpu010: 13%]
```

### Run Crash Result
```
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==64021==ERROR: AddressSanitizer: stack-overflow on address 0x7fff43dbb778 (pc 0x55bd6ff5203d bp 0x7fff445babd0 sp 0x7fff43dba780 T0)
    #0 0x55bd6ff5203d in main /mnt/c/Users/NPT/Desktop/0412/112-spring-software-testing-and-secure-programming/lab6/src/hw0302.c:46
    #1 0x7fa0d9b33d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7fa0d9b33e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x55bd6ff52b74 in _start (/mnt/c/Users/NPT/Desktop/0412/112-spring-software-testing-and-secure-programming/lab6/src/bmpcomp+0x2b74)

SUMMARY: AddressSanitizer: stack-overflow /mnt/c/Users/NPT/Desktop/0412/112-spring-software-testing-and-secure-programming/lab6/src/hw0302.c:46 in main
==64021==ABORTING
```
