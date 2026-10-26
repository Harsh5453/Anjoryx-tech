package com.anjoryx.util;

import java.util.regex.Pattern;

/**
 * Minimal, dependency-free sanitisation for free-text form fields.
 * Strips HTML tags and control characters so stored/emailed content can't
 * inject markup or scripts. This is a defense-in-depth measure, not a
 * substitute for output-encoding wherever this data is later rendered.
 */
public final class InputSanitizer {

    private static final Pattern HTML_TAG = Pattern.compile("<[^>]*>");
    private static final Pattern CONTROL_CHARS = Pattern.compile("[\\x00-\\x08\\x0B\\x0C\\x0E-\\x1F]");

    private InputSanitizer() {
    }

    public static String clean(String input) {
        if (input == null) {
            return null;
        }
        String noTags = HTML_TAG.matcher(input).replaceAll("");
        String noControlChars = CONTROL_CHARS.matcher(noTags).replaceAll("");
        return noControlChars.trim();
    }
}
