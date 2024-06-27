
Name: 蘇宥穆    
ID: 512559029

### Fuzz Monitor

 american fuzzy lop 2.57b (bmpcomp)
┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 3 min, 28 sec       │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 1 min, 13 sec       │  total paths : 8      │
│ last uniq crash : 0 days, 0 hrs, 2 min, 8 sec        │ uniq crashes : 1      │
│  last uniq hang : 0 days, 0 hrs, 1 min, 20 sec       │   uniq hangs : 6      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 0 (0.00%)         │    map density : 0.04% / 0.04%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 1.34 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : bitflip 2/1           │ favored paths : 1 (12.50%)             │
│ stage execs : 153/223 (68.60%)      │  new edges on : 2 (25.00%)             │
│ total execs : 533                   │ total crashes : 12 (1 unique)          │
│  exec speed : 0.00/sec (zzzz...)    │  total tmouts : 40 (5 unique)          │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 6/224, 0/0, 0/0                       │    levels : 2          │
│  byte flips : 0/0, 0/0, 0/0                         │   pending : 8          │
│ arithmetics : 0/0, 0/0, 0/0                         │  pend fav : 1          │
│  known ints : 0/0, 0/0, 0/0                         │ own finds : 5          │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/0, 0/0                              │ stability : 100.00%    │
│        trim : 100.00%/37, 0.00%                     ├────────────────────────┘
└─────────────────────────────────────────────────────┘             [cpu:16%]  │

### Run Crash Result

size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==25967==ERROR: AddressSanitizer: stack-overflow on address 0x7ffec7bf68f9 (pc 0x557bceb460cd bp 0x7ffec83fcd66 sp 0x7ffec7bf7943 T0)
    #0 0x557bceb460cd in main /mnt/c/Users/yumu su/Desktop/112-spring-software-testing-and-secure-programming/lab6/src/hw0302.c:46
    #1 0x7fdec0687123 in __libc_start_main ../csu/libc-start.c:377
    #2 0x5584be645bc3 in _start (/mnt/c/Users/yumu su/Desktop/112-spring-software-testing-and-secure-programming/lab6/src/bmpcomp+0x2bc3)
SUMMARY: AddressSanitizer: stack-overflow /mnt/c/Users/yumu su/Desktop/112-spring-software-testing-and-secure-programming/lab6/src/hw0302.c:46 in main
==25967==ABORTING=======
