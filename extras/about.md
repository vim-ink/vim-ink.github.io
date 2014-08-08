# About

vim.ink is a vim color scheme designer. A vim color scheme comes with a light
and dark variant making it suitable for different lightning conditions. vim.ink
includes a default set of grayscale tones designed to be used on its own, or as
a base for new color schemes.

## Default color scheme

The default color scheme has been carefully designed to look balanced among
highlight groups, and between light and dark variants. It can be complemented
with system-wide adjustments such as using the brightness control of the
display, or software such as F.lux or Redshift to adapt the colors to the time
of day.

## Setting groups to transparent, or resetting groups to default

Shift-clicking an individual color makes it transparent. Alt-clicking resets an
individual color to its default value. Alt-clicking resets an individual post
process slider to zero.

# ~/.vimrc

## Load color scheme

    colorscheme my-default

    set background=light

## Automatically reload color scheme on write

    autocmd! BufWritePost my-default.vim source %

## Make vertical split line continuous

    set fillchars=vert:\│

# Implementation

vim.ink is built with React and HTML5 technologies. Local storage is used for
persisting the application state. Libraries are used sparingly, and the UI
components are implemented using plain CSS with a little help of Sass.

## Limitations

This section mentions the limitations that are by design. Check GitHub Issues
for an updated list of bugs and enhancements.

### Included source code use generic groups

The highlight groups of the included source are extracted from the generated
HTML of vims built-in command `:TOhtml`.  From my experience, generic group
names such as `Statement` or `Conditional` are exported instead of specific
group names such as `sassVariable` or `sassVariableAssignment`. Because specific
groups are often linked to generic groups, most source code should look
acceptable with only the generic groups set. For this reason, the included
source code will continue to use generic groups. If you need to style specific
groups and find a way to export them, then I suggest you to use the paste
functionality.

### Only supports vim

vim.ink has been built with vim in mind, and will not support other editors. I’m
totally for having an almost identical color scheme designer for another editor,
and would encourage someone interested to fork the project and modify it. This
is a forward-looking project, and will of course support NeoVim.

# Contribute

vim.ink is developed and designed by Alexander Teinum. Contact me through
GitHub, Twitter, or email if you are interested in contributing. My email
address is ateinum@gmail.com.
