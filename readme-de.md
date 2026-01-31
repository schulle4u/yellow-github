# Github 0.9.0

Neueste GitHub-Repository-Commits anzeigen. Entwickelt von Steffen Schultz.

<p align="center"><img src="screenshot.png" alt="Bildschirmfoto"></p>

## Wie man eine Erweiterung installiert

[ZIP-Datei herunterladen](https://github.com/schulle4u/yellow-github/archive/refs/heads/main.zip) und in dein `system/extensions`-Verzeichnis kopieren. [Weitere Informationen zu Erweiterungen](https://github.com/annaesvensson/yellow-update/tree/main/readme-de.md).

## Wie man GitHub-Repository-Commits anzeigt

Erstelle eine `[github]`-Abkürzung. 

Die folgenden Argumente sind verfügbar, alle Argumente sind optional: 

`Repo` = Das GitHub-Repository für welches die Commits angezeigt werden sollen.  
`ShortcutEntries` = Anzahl der Commits.  

Diese Erweiterung verwendet GitHubs REST-API zur Abfrage von öffentlichen Repository-Informationen. Es können [Ratenbegrenzungen](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api?apiVersion=2022-11-28#primary-rate-limit-for-unauthenticated-users) auftreten, normalerweise 60 Abrufe pro Stunde und IP.

## Beispiele

Grundlegende Verwendung, zeigt die neuesten Commits von datenstrom/yellow an: 

    [github]
    
Anderes Repository spezifizieren und mehr Commits anzeigen: 

    [github schulle4u/yellow-github 10]

## Einstellungen

Die folgende Einstellung kann in der Datei `system/extensions/yellow-system.ini` angepasst werden: 

`GithubShortcutEntries` = Anzahl der Commits.  

Hast du Fragen? [Hilfe finden](https://datenstrom.se/de/yellow/help/).
