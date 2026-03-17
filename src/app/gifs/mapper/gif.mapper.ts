import { Gif } from "../interfaces/gif.interface";
import { GiphyItem } from "../interfaces/giphy.interfaces";

export class GifMapper {
  static toGif(giphyImage: GiphyItem): Gif {
    return {
      id: giphyImage.id,
      title: giphyImage.title,
      url: giphyImage.images.original.url,
    };
  }

  static toGifList(items: GiphyItem[]): Gif[] {
    return items.map(this.toGif);
  }
}
