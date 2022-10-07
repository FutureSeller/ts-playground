interface IPlayer {
  play(): void
}

export class MusicPlayer {
  filename: string

  constructor(filename: string) {
    this.filename = filename
  }

  play() {
    console.log(this.filename)
  }
}

export class VideoPlayer {
  filename: string

  constructor(filename: string) {
    this.filename = filename
  }

  stream() {
    console.log(this.filename)
  }
}

export class VideoPlayerAdapter {
  player: VideoPlayer

  constructor(player: VideoPlayer) {
    this.player = player
  }

  play() {
    this.player.stream()
  }
}

export const ContentPlayService = (player: IPlayer) => ({
  play: () => {
    player.play()
  },
})
