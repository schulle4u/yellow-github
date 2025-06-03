<?php
// Github extension, https://github.com/schulle4u/yellow-github

class YellowGithub {
    const VERSION = "0.9.0";
    public $yellow;         // access to API
    
    // Handle initialisation
    public function onLoad($yellow) {
        $this->yellow = $yellow;
        $this->yellow->system->setDefault("githubShortcutEntries", "5");
    }
    
    // Handle page content element
    public function onParseContentElement($page, $name, $text, $attributes, $type) {
        $output = null;
        if ($name=="github" && ($type=="block" || $type=="inline")) {
            list($repo, $shortcutEntries) = $this->yellow->toolbox->getTextArguments($text);
            if (is_string_empty($repo)) $repo = "datenstrom/yellow";
            if (is_string_empty($shortcutEntries)) $shortcutEntries = $this->yellow->system->get("githubShortcutEntries");
            $repoData = explode("/", $repo);
            $output = "<div class=\"github-repo-section\" data-github-owner=\"".htmlspecialchars($repoData[0])."\" data-github-repo=\"".htmlspecialchars($repoData[1])."\" data-number-of-commits=\"".htmlspecialchars($shortcutEntries)."\">\n";
            $output .= "<ul class=\"github-commits-list\">\n";
            $output .= "</ul></div>\n";
        }
        return $output;
    }
    
    // Handle page extra data
    public function onParsePageExtra($page, $name) {
        $output = null;
        if ($name=="header") {
            $assetLocation = $this->yellow->system->get("coreServerBase").$this->yellow->system->get("coreAssetLocation");
            $output .= "<script type=\"text/javascript\" defer=\"defer\" src=\"{$assetLocation}github.js\"></script>\n";
        }
        return $output;
    }
}
