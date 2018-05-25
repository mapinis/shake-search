from html.parser import HTMLParser
import os

class PlayParser(HTMLParser):

    def __init__(self, outLines):
        super(PlayParser, self).__init__()
        self._speaker = ""
        self._act = ""
        self._scene = ""
        self._line = ""
        self._outLines = outLines

    def handle_starttag(self, tag, attrs):
        if tag == "a":
            if attrs[0][1][0] != "s":
                lineInfo = attrs[0][1].split(".")
                self._act = lineInfo[0]
                self._scene = lineInfo[1]
                self._line = lineInfo[2]
    
    def handle_data(self, data):
        if self.get_starttag_text() != None:
            if self.get_starttag_text()[0:2] == "<A":
                self._outLines.append('<line act="%s" scene="%s" line="%s" speaker="%s">%s</line>' % (self._act, self._scene, self._line, self._speaker, data))
            elif self.get_starttag_text()[0:3] == "<b>" and data[0] != "\n":
                self._speaker = data

for file in os.listdir(os.getcwd()):
    filename = os.fsdecode(file)
    if(filename.endswith(".txt")):
        outLines = []

        parser = PlayParser(outLines)
        parser.feed(open(filename).read())

        open("../plays/" + filename, "w").writelines(outLines)
