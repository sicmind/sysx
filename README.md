# sysx
HTML/Javascript based MIDI SYSEX editing tools
Now completely rebuilt.

# ! This is a work in progress !

SYSX is being built as a framework for building in-browser MIDI device parameter editing environments. It will provide the foundation of communicating with attached MIDI devices using System Exclusive, NRPN, or Control Change methodolgies to modify their respective parameters.

## About the code base
The code style in the sysx core has an intentional approach to support the goals in the project. Modules are built with analogies to real-world devices in mind.

## Project goals
1. *Simplicity of Implementation* This is the chief goal of the project.  HTML control elements are to have a clear method of connecting user input to appropriate MIDI messages the target device requires.

2. *Ease of Device Specifications* THe communication schema for a target device is designed to work as a translation of common manufacturer MIDI implementation/specification documents. This will make developing for new devices more streamlined. (A stretch goal of this project is to build a transpiler to convert documents in the common spec format to a usable schema file.)

## Examples
The examples folder includes builds of a few devices I have attached to my work machine. These machines represent a wide array of different communication requirements. There are to test the plasticity of the core framework.