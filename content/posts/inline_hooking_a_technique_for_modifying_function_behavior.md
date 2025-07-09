---
title: "Inline Hooking: A Technique for Modifying Function Behavior"
date: 2019-09-22
tags:
- Windows
- hacking
- hooking
featuredImage: /images/inline_hooking.jpg
---

## Introduction

Inline hooking is a technique used to modify the behavior of functions in an application or operating system. It involves inserting code into the body of a function, and redirecting the flow of execution to the inserted code before or after the original function is executed.

Inline hooking is often used in security-related applications, such as anti-virus software or intrusion detection systems, where it is necessary to monitor or alter the behavior of system-level functions. It can also be used for debugging, profiling, or instrumentation purposes, where it is necessary to collect information about the execution of a function.

Inline hooking works by overwriting the first few bytes of the target function with a JMP (jump) instruction, which redirects the flow of execution to the hook function. The hook function can then perform additional actions before or after calling the original function.

## Sample code

``` c
#include <windows.h>
#include <stdio.h>

typedef int (WINAPI * MessageBoxW_t)(HWND, LPCWSTR, LPCWSTR, UINT);
MessageBoxW_t originalMessageBoxW;

int WINAPI hookedMessageBoxW(HWND hWnd, LPCWSTR lpText, LPCWSTR lpCaption, UINT uType)
{
    printf("MessageBoxW Hooked!\n");
    printf("Text: %ls\nCaption: %ls\nType: %d\n", lpText, lpCaption, uType);
    return originalMessageBoxW(hWnd, L"Hooked!", lpCaption, uType);
}

int main()
{
    HMODULE hUser32 = LoadLibraryW(L"user32.dll");
    if (hUser32 == NULL) {
        printf("Could not load user32.dll\n");
        return 1;
    }
    originalMessageBoxW = (MessageBoxW_t)GetProcAddress(hUser32, "MessageBoxW");
    if (originalMessageBoxW == NULL) {
        printf("Could not find MessageBoxW\n");
        return 1;
    }

    DWORD oldProtect;
    VirtualProtect(originalMessageBoxW, 5, PAGE_EXECUTE_READWRITE, &oldProtect);

    unsigned char JMP[5] = {0xE9, 0x00, 0x00, 0x00, 0x00};
    DWORD relativeAddress = (DWORD)&hookedMessageBoxW - (DWORD)originalMessageBoxW - 5;
    memcpy(&JMP[1], &relativeAddress, sizeof(DWORD));
    memcpy(originalMessageBoxW, JMP, sizeof(JMP));

    VirtualProtect(originalMessageBoxW, 5, oldProtect, &oldProtect);
    MessageBoxW(NULL, L"Test", L"Test", MB_OK);
    return 0;
}
```

One of the benefits of inline hooking is that it does not require any changes to the original code, making it a convenient way to modify the behavior of an application or operating system. It also does not require any special privileges, as it operates in user-mode, and can be easily removed or modified as needed.

However, inline hooking can also be difficult to implement correctly, as it requires a deep understanding of the target function and the underlying system. It also requires careful consideration of the security implications of modifying the behavior of system-level functions, as it can potentially introduce vulnerabilities or stability issues.

## Conclusion
Inline hooking is a powerful technique for modifying the behavior of functions in an application or operating system. It provides a convenient way to implement custom behavior, without requiring any changes to the original code. However, it also requires careful consideration of the security implications and the technical challenges of correctly implementing the hook.
