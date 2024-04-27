Name: 杜佩珊
ID: 512558002

### Fuzz Monitor
                       american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 4 min, 14 sec       │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 0 min, 13 sec       │  total paths : 9      │
│ last uniq crash : 0 days, 0 hrs, 3 min, 29 sec       │ uniq crashes : 1      │
│  last uniq hang : 0 days, 0 hrs, 0 min, 28 sec       │   uniq hangs : 5      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 0 (0.00%)         │    map density : 0.04% / 0.05%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 1.48 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : bitflip 4/1           │ favored paths : 1 (11.11%)             │
│ stage execs : 193/221 (87.33%)      │  new edges on : 4 (44.44%)             │
│ total execs : 755                   │ total crashes : 40 (1 unique)          │
│  exec speed : 1.20/sec (zzzz...)    │  total tmouts : 82 (5 unique)          │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 6/224, 2/223, 0/0                     │    levels : 2          │
│  byte flips : 0/0, 0/0, 0/0                         │   pending : 9          │
│ arithmetics : 0/0, 0/0, 0/0                         │  pend fav : 1          │
│  known ints : 0/0, 0/0, 0/0                         │ own finds : 8          │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/0, 0/0                              │ stability : 100.00%    │
│        trim : 100.00%/37, n/a                       ├────────────────────────┘
└─────────────────────────────────────────────────────┘          [cpu001: 52%]

### Run Crash Result
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==8457==ERROR: AddressSanitizer: stack-overflow on address 0x7ffe12be8728 (pc 0x55797566701d bp 0x7ffe133e6b80 sp 0x7ffe12be7730 T0)
    #0 0x55797566701c in main /home/user/桌面/github/112-spring-software-testing-and-secure-programming/lab6/src/hw0302.c:46
    #1 0x7faabc36d082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x557975667acd in _start (/home/user/桌面/github/112-spring-software-testing-and-secure-programming/lab6/src/bmpcomp+0x2acd)

SUMMARY: AddressSanitizer: stack-overflow /home/user/桌面/github/112-spring-software-testing-and-secure-programming/lab6/src/hw0302.c:46 in main
==8457==ABORTING

