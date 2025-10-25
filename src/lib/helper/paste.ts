import type { FileUpload, TutorialFile, Game, TableFile, B2SFile, WheelArtFile } from '$lib/types/VPin';
import { DB } from '$lib/stores/DbStore';
import { nanoid } from 'nanoid';

export class Paste {

    protected key: keyof Game;

    constructor(key: keyof Game) {
        this.key = key;
    }

    newFromPaste(paste: string): FileUpload[] | undefined {
        const json = JSON.parse(paste);
        const date = new Date(json.dateModified || json.dateCreated || new Date());

        //@ts-ignore
        return [{
            id: nanoid(10),
            version: json.softwareVersion,
            createdAt: date.getTime(),
            updatedAt: date.getTime(),
            authors: [json.author.name],
            urls: [{ url: json.url }]
        }];
    }

    pasteVersion = <T extends FileUpload>(file: T, paste: string): T => {
        const json = JSON.parse(paste);

        if (json) {
            // data from an e.g. VPU page
            const date = new Date(json.dateModified || json.dateCreated);

            file.version = json.softwareVersion || file.version;
            file.createdAt = date.getTime() || file.createdAt;
        } else {
            // plain text
            file.version = paste || file.version;
        }

        return [file, true];
    }

    makeComment = (game: Game, other: FileUpload): string => {
        return `Retheme of ${game?.name || ""} (${game.manufacturer} ${game.year}) by ${(other.authors || [""])[0]}`;
    }

    pasteComment = <T extends TableFile>(file: T, paste: string): [T, Boolean] => {
        const other = DB.findFile(paste, this.key);

        if (other) {
            file.parentId = other.id;

            const game = DB.getGame(other.game?.id || "");
            
            if (file.game != other.game) {
                file.comment = this.makeComment(game, other);
            }
            return [file, true];
        } else {
            return [file, false];
        }
    }

    pasteAuthors = <T extends FileUpload>(file: T, paste: string): [T, Boolean] => {
        const other = DB.findFile(paste, this.key);

        if (other) {
            file.parentId = other.id;
            if (!other?.authors?.length) return [file, true];

            if (!file.authors) {
                file.authors = [];
            }

            for (const author of other.authors) {
                if (!file.authors.includes(author)) {
                    file.authors.push(author);
                }
            }
            return [file, true];
        } else {
            return [file, false];
        }
    }

    pasteFeatures = <T extends TableFile | B2SFile>(file: T, paste: string): [T, Boolean] => {
        const other = DB.findFile(paste, this.key) as unknown as TableFile|B2SFile;

        if (other) {
            file.parentId = other.id;

            if (!other?.features?.length) return [file, true];

            if (!file.features) {
                file.features = [];
            }

            for (const feature of other.features) {            
                if (!file.features.includes(feature)) {
                    file.features.push(feature);
                }
            }
            return [file, true];
        } else {
            return [file, false];
        }
    }

    pasteParent = <T extends TableFile>(file: T, paste: string): [T, Boolean] => {
        const other = DB.findFile(paste, this.key) as unknown as TableFile|B2SFile;
        const game = DB.getGame(other.game?.id || "");

        if (other) {
            file.parentId = other.id;

            if (!file.features?.length) {
                file.features = other.features;
                if (other.game != file.game && !file.features?.includes("Retheme")) {
                    file.features?.push("Retheme");
                }
            }

            if (file.authors.length) {
                for (const author of other.authors) {
                    if (!file.authors.includes(author)) {
                        file.authors.push(author);
                    }
                }
            }

            if (!file.comment) {
                file.comment = this.makeComment(game, other);
            }
            return [file, true];
        } else {
            return [file, false];
        }
    }

}

export class PasteTable extends Paste {

    constructor() {
        super("tableFiles");
    }
}

export class PasteB2S extends Paste {

    constructor() {
        super("b2sFiles");
    }
}

export class PasteWheel extends Paste {

    constructor() {
        super("wheelArtFiles");
    }

    commentFromJSON = (json: any): string | null => {
        const text = `${json.name ?? ""} ${json.description ?? ""}`.toLowerCase();
        const keywords: Record<string, string> = {
            "animated": "Animated",
            "neon": "Neon",
            "glass orb": "Glass Orb",
            "blue ring": "Blue Ring",
            "logo": "Logo",
            "diagonal": "Diagonal",
        };

        const items = Object.entries(keywords)
            .filter(([keyword]) => text.includes(keyword))
            .map(([_, label]) => label);

        return items.length > 0 ? items.join(" ") : null;
    }

    newFromPaste = (paste: string): FileUpload[] | undefined => {
        let n = super.newFromPaste(paste) as unknown as WheelArtFile[];
        if (n) {
            const json = JSON.parse(paste);
            n[0].comment = this.commentFromJSON(json)
        }
        return n as unknown as FileUpload[];
    }

}


export class PasteTutorial extends Paste {

    constructor() {
        super("tutorialFiles");
    }

    newFromPaste = (paste: string): FileUpload[] | undefined => {
        let n = super.newFromPaste(paste) as unknown as TutorialFile[];
        if (n) {
            const json = JSON.parse(paste);
            n[0].youtubeId = json.youtubeId;
            n[0].title = json.name;
        }
        return n as unknown as FileUpload[];
    }
}

export class PasteROM extends Paste {

    constructor() {
        super("romFiles");
    }

    newFromPaste = (paste: string): FileUpload[] | undefined => {
        if (paste.length <= 16) {
            const game = DB.findRom(paste);
            if (game && game.romFiles) {
                return structuredClone(game.romFiles)
                    .map(rom => {
                        rom.id = nanoid(10);
                        return rom;
                    });
            }
        }

        return super.newFromPaste(paste);
    }
}

export const getClipboardText = (event: ClipboardEvent) => {
    return event.clipboardData?.getData('Text') || "";
}
