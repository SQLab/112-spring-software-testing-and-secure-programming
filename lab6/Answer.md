Name: 張詠欽
ID: 512558007

### Fuzz Monitor
```
                       american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 4 min, 2 sec        │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 1 min, 29 sec       │  total paths : 17     │
│ last uniq crash : 0 days, 0 hrs, 3 min, 48 sec       │ uniq crashes : 1      │
│  last uniq hang : 0 days, 0 hrs, 1 min, 51 sec       │   uniq hangs : 1      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 0 (0.00%)         │    map density : 0.04% / 0.04%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 1.81 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : arith 32/8            │ favored paths : 1 (5.88%)              │
│ stage execs : 188/2221 (8.46%)      │  new edges on : 3 (17.65%)             │
│ total execs : 3376                  │ total crashes : 308 (1 unique)         │
│  exec speed : 16.50/sec (zzzz...)   │  total tmouts : 258 (6 unique)         │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 6/192, 3/191, 1/189                   │    levels : 2          │
│  byte flips : 0/24, 0/23, 0/21                      │   pending : 17         │
│ arithmetics : 7/1341, 0/1029, 0/0                   │  pend fav : 1          │
│  known ints : 0/0, 0/0, 0/0                         │ own finds : 16         │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/0, 0/0                              │ stability : 100.00%    │
│        trim : 100.00%/35, 0.00%                     ├────────────────────────┘
└─────────────────────────────────────────────────────┘          [cpu001: 86%]
```

### Run Crash Result
```
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==200043==ERROR: AddressSanitizer: stack-overflow on address 0x7ffcf4ac69d8 (pc 0x5573b6e88ee1 bp 0x7ffcf62c7730 sp 0x7ffcf4ac69e0 T0)
    #0 0x5573b6e88ee1 in main /home/kali/AFL/lab6/src/hw0302.c:46
    #1 0x7f08062456c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f0806245784 in __libc_start_main_impl ../csu/libc-start.c:360
    #3 0x5573b6e898d0 in _start (/home/kali/AFL/lab6/src/bmpcomp+0x28d0) (BuildId: 8fee90f88958c0594408a30de9c0d884264cdd47)

SUMMARY: AddressSanitizer: stack-overflow /home/kali/AFL/lab6/src/hw0302.c:46 in main
==200043==ABORTING
```
