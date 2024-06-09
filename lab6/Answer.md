Name: 潘韋丞
ID: 511559027

### Fuzz Monitor
```
   american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 0 min, 14 sec       │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 0 min, 0 sec        │  total paths : 6      │
│ last uniq crash : 0 days, 0 hrs, 0 min, 10 sec       │ uniq crashes : 1      │
│  last uniq hang : none seen yet                      │   uniq hangs : 0      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 0 (0.00%)         │    map density : 0.04% / 0.04%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 1.77 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : bitflip 2/1           │ favored paths : 1 (16.67%)             │
│ stage execs : 184/223 (82.51%)      │  new edges on : 1 (16.67%)             │
│ total execs : 497                   │ total crashes : 23 (1 unique)          │
│  exec speed : 22.29/sec (slow!)     │  total tmouts : 45 (3 unique)          │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 4/224, 0/0, 0/0                       │    levels : 2          │
│  byte flips : 0/0, 0/0, 0/0                         │   pending : 6          │
│ arithmetics : 0/0, 0/0, 0/0                         │  pend fav : 1          │
│  known ints : 0/0, 0/0, 0/0                         │ own finds : 5          │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/0, 0/0                              │ stability : 100.00%    │
│        trim : 100.00%/37, n/a                       ├────────────────────────┘
└─────────────────────────────────────────────────────┘          [cpu010:  9%]
```

### Run Crash Result
```
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==401==ERROR: AddressSanitizer: stack-overflow on address 0x7ffd0726d698 (pc 0x556c57c0d02e bp 0x7ffd07a6caf0 sp 0x7ffd0726c6a0 T0)
    #0 0x556c57c0d02e in main /home/pipi/112-spring-software-testing-and-secure-programming/lab6/src/hw0302.c:46
    #1 0x7f64e8941d8f  (/lib/x86_64-linux-gnu/libc.so.6+0x29d8f)
    #2 0x7f64e8941e3f in __libc_start_main (/lib/x86_64-linux-gnu/libc.so.6+0x29e3f)
    #3 0x556c57c0db44 in _start (/home/pipi/112-spring-software-testing-and-secure-programming/lab6/src/bmpcomp+0x2b44)

SUMMARY: AddressSanitizer: stack-overflow /home/pipi/112-spring-software-testing-and-secure-programming/lab6/src/hw0302.c:46 in main
==401==ABORTING
```
