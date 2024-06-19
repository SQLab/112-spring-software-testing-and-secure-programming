Name: 
ID: 

### Fuzz Monitor
```
american fuzzy lop ++4.08c {default} (../src/bmpcomp) [fast]
┌─ process timing ────────────────────────────────────┬─ overall results ────┐
│        run time : 0 days, 0 hrs, 35 min, 22 sec     │  cycles done : 2     │
│   last new find : 0 days, 0 hrs, 15 min, 58 sec     │ corpus count : 16    │
│last saved crash : 0 days, 0 hrs, 35 min, 19 sec     │saved crashes : 1     │
│ last saved hang : 0 days, 0 hrs, 35 min, 16 sec     │  saved hangs : 2     │
├─ cycle progress ─────────────────────┬─ map coverage┴──────────────────────┤
│  now processing : 14.8 (87.5%)       │    map density : 0.00% / 0.00%      │
│  runs timed out : 0 (0.00%)          │ count coverage : 2.55 bits/tuple    │
├─ stage progress ─────────────────────┼─ findings in depth ─────────────────┤
│  now trying : splice 6               │ favored items : 3 (18.75%)          │
│ stage execs : 7/12 (58.33%)          │  new edges on : 3 (18.75%)          │
│ total execs : 12.6k                  │ total crashes : 6212 (1 saved)      │
│  exec speed : 0.00/sec (zzzz...)     │  total tmouts : 2408 (0 saved)      │
├─ fuzzing strategy yields ────────────┴─────────────┬─ item geometry ───────┤
│   bit flips : disabled (default, enable with -D)   │    levels : 5         │
│  byte flips : disabled (default, enable with -D)   │   pending : 7         │
│ arithmetics : disabled (default, enable with -D)   │  pend fav : 0         │
│  known ints : disabled (default, enable with -D)   │ own finds : 15        │
│  dictionary : n/a                                  │  imported : 0         │
│havoc/splice : 15/3046, 1/9327                      │ stability : 100.00%   │
│py/custom/rq : unused, unused, unused, unused       ├───────────────────────┘
│    trim/eff : 99.98%/92, disabled                  │          [cpu000: 75%]
└─ strategy: explore ────────── state: in progress ──┘
```

### Run Crash Result
```
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==70360==ERROR: AddressSanitizer: stack-overflow on address 0x7ffd37a9b7d8 (pc 0x56019c8d1ee3 bp 0x7ffd3dafc2b0 sp 0x7ffd37a9b7e0 T0)
    #0 0x56019c8d1ee3 in main /home/kali/Desktop/112-spring-software-testing-and-secure-programming-511558018/lab6/src/hw0302.c:46
    #1 0x7f20002456c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f2000245784 in __libc_start_main_impl ../csu/libc-start.c:360
    #3 0x56019c8d2900 in _start (/home/kali/Desktop/112-spring-software-testing-and-secure-programming-511558018/lab6/src/bmpcomp+0x2900) (BuildId: 1607eebff355e3d1d8f0d2e259395a3b03ac8705)

SUMMARY: AddressSanitizer: stack-overflow /home/kali/Desktop/112-spring-software-testing-and-secure-programming-511558018/lab6/src/hw0302.c:46 in main
==70360==ABORTING

```
