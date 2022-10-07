import { ContentPlayService, VideoPlayer, VideoPlayerAdapter, MusicPlayer } from '.'

const streamVideo = jest.fn()
const playMusic = jest.fn()
jest.mock('.', () => ({
  ...jest.requireActual('.'),
  MusicPlayer: jest.fn().mockImplementation(() => ({ play: playMusic })),
  VideoPlayer: jest.fn().mockImplementation(() => ({ stream: streamVideo })),
}))

describe('adapter', () => {
  test('original feature: a service plays only music', () => {
    const musicPlayer = new MusicPlayer('video')
    musicPlayer.play()

    expect(playMusic).toHaveBeenCalledTimes(1)

    ContentPlayService(musicPlayer).play()
    expect(playMusic).toHaveBeenCalledTimes(2)
  })

  test('additional feature: a service plays video with adapter', () => {
    const videoPlayer = new VideoPlayer('video')
    const videoAdapter = new VideoPlayerAdapter(videoPlayer)
    ContentPlayService(videoAdapter).play()

    expect(streamVideo).toHaveBeenCalledTimes(1)
  })
})
