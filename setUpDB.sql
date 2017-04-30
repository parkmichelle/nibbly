--CREATE DATABASE nibbly;
CREATE TABLE Nibble (
       NID
       PID
       Title varchar(255),
       Description varchar(1000),
       NumDownloads int,
       Rating int,
       Difficulty int, --may map to something
       Duration int --in minutes?
       );

/*
Level (int + mapping)
Duration (int, in minutes?)
Notes (file)
LATER: Source code (file)
Video
VID
NID
Name (String)
Description (String)
Type (int + mapping 360 vs regular)
File
Slides (cap at ~3)
SID
NID
Name (String)
LATER: Organization
OID
Name (String)
Location (String)
Description (String)
People??
Logo (file)
Person
PID
Profile Pic (file)
Name (String)
Bio (String)
Favorites (NIDs)
[password]
Favorites
FID
PID
NID
*/
