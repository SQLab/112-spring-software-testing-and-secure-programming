Name: 楊庚憲
ID: 512558014

### Fuzz Monitor
american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 33 min, 38 sec      │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 28 min, 46 sec      │  total paths : 18     │
│ last uniq crash : 0 days, 0 hrs, 33 min, 26 sec      │ uniq crashes : 1      │
│  last uniq hang : 0 days, 0 hrs, 32 min, 2 sec       │   uniq hangs : 3      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 0 (0.00%)         │    map density : 0.05% / 0.05%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 2.18 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : arith 16/8            │ favored paths : 1 (5.56%)              │
│ stage execs : 809/1430 (56.57%)     │  new edges on : 3 (16.67%)             │
│ total execs : 2932                  │ total crashes : 135 (1 unique)         │
│  exec speed : 1.74/sec (zzzz...)    │  total tmouts : 586 (4 unique)         │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 5/192, 1/191, 2/189                   │    levels : 2          │
│  byte flips : 0/24, 0/23, 0/21                      │   pending : 18         │
│ arithmetics : 10/1341, 0/0, 0/0                     │  pend fav : 1          │
│  known ints : 0/0, 0/0, 0/0                         │ own finds : 17         │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/0, 0/0                              │ stability : 100.00%    │
│        trim : 100.00%/35, 0.00%                     ├────────────────────────┘
└─────────────────────────────────────────────────────┘          [cpu001: 70%]

### Run Crash Result
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==3729574==ERROR: AddressSanitizer: stack-overflow on address 0x7ffe3102c918 (pc 0x55c9307790e3 bp 0x7ffe3282d670 sp 0x7ffe3102c920 T0)                                                                                                 
    #0 0x55c9307790e3 in main /home/kali/Desktop/112-spring-software-testing-and-secure-programming/lab6/src/hw0302.c:46
    #1 0x7f0b629666c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f0b62966784 in __libc_start_main_impl ../csu/libc-start.c:360
    #3 0x55c930779ac0 in _start (/home/kali/Desktop/112-spring-software-testing-and-secure-programming/lab6/src/bmpcomp+0x2ac0) (BuildId: 044ca139f3ac97fdbfeccef68824a0995b09d836)

SUMMARY: AddressSanitizer: stack-overflow /home/kali/Desktop/112-spring-software-testing-and-secure-programming/lab6/src/hw0302.c:46 in main
==3729574==ABORTING
