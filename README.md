<p align="right"><a href="README-de.md">Deutsch</a> &nbsp; <a href="README.md">English</a></p>

# Github 0.9.0

Display latest GitHub repository commits.

<p align="center"><img src="SCREENSHOT.png" alt="Screenshot"></p>

## How to install an extension

[Download ZIP file](https://github.com/schulle4u/yellow-github/archive/refs/heads/main.zip) and copy it into your `system/extensions` folder. [Learn more about extensions](https://github.com/annaesvensson/yellow-update).

## How to display GitHub repository commits

Create a `[github]` shortcut. 

The following arguments are available. all arguments are optional: 

`Repo` = the GitHub repository for showing latest commits.  
`ShortcutEntries` = Number of commits.  

This extension uses the GitHub REST API to fetch public repository information. [Rate limits](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api?apiVersion=2022-11-28#primary-rate-limit-for-unauthenticated-users) are applied to unauthenticated users, usually 60 requests per hour/IP. 

## Examples

Basic usage, displays what's happening at Datenstrom: 

    [github]
    
Specify repository and return more entries: 

    [github schulle4u/yellow-github 10]

## Settings

The following settings can be configured in file `system/extensions/yellow-system.ini`: 

`GithubShortcutEntries` = Number of commits.  

## Developer

Steffen Schultz. [Get help](https://datenstrom.se/yellow/help/).
