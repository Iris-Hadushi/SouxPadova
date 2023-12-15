import $ from "jquery";

import { app } from '../../utils/store';

export default class Video{
    constructor(){
        this.header = document.querySelector('header');

        this.video = {
            element: document.querySelector('video'),
            all: document.querySelectorAll('video'),
        };
    }

    init() {
        if(this.video.element){
            this.toggle();
        }
    }

    toggle = () => {
        $('video').each(function(){
            $(this).on('click', function(){
                var dataPoster = $(this).data('poster');
                var dataVideo = $(this).data('video');

                var video = '<video preload="auto" poster="'+dataPoster+'"><source src="'+dataVideo+'" type="video/mp4"></video>';

                $('#videopopup video').remove();
                $('#videopopup .video-player').append(video);
                $('#videopopup').addClass('active');
                $('#videopopup video').attr('poster', dataPoster);
                $('#videopopup video source').attr('src', dataVideo);

                const helper_getPercentage = (presentTime, totalTime) => {
                    let calcPercentage = (presentTime / totalTime) * 100;
                    return parseFloat(calcPercentage.toString());
                }

                const helper_calcDuration = duration => {
                    let seconds = parseInt(duration % 60);
                    let minutes = parseInt((duration % 3600) / 60);
                    let hours = parseInt(duration / 3600);

                    return {
                        hours: helper_pad(hours),
                        minutes: helper_pad(minutes.toFixed()),
                        seconds: helper_pad(seconds.toFixed())
                    };
                }

                const helper_pad = number => {
                    if(number > -10 && number < 10){
                        return '0' + number;
                    } else return number;
                }

                $('.video-player').each(function (i, playerVideo){
                    let elemVideo = $(playerVideo).find('video');
                    let elemPlayPause = $(playerVideo).find('.toggle-play-pause');
                    let elemStartTime = $(playerVideo).find('.start-time');
                    let elemEndTime = $(playerVideo).find('.end-time');
                    let elemVideoSeekbar = $(playerVideo).find('.video-seekbar');
                    let elemVideoProgress = $(elemVideoSeekbar).find('.progress');
                    let elemToggleVolume = $(playerVideo).find('.toggle-volume');
                    let elemVolumeSeekbar = $(playerVideo).find('.volume-seekbar');
                    let elemVolumeProgress = $(elemVolumeSeekbar).find('.progress');

                    let elemCloser = $('#videoClose');

                    let elemControls = $(playerVideo).find('.video-controls');
                    let elemPlayPauseBig = $(playerVideo).find('.play-on-stop button');

                    let totalDurationInSeconds = 0;
                    let currentTimeInSeconds = 0;
                    let currentDuration = null;
                    let totalDuration = null;
                    let seekPercentage = 0;
                    let volumeValue = 1;
                    let volumePercentage = 100;

                    //***** UPDATEs Functions (HTML) ***** //
                    const updateTotalDuration = () => {
                        $(elemEndTime).html(
                            // `${totalDuration.hours}:${totalDuration.minutes}:${totalDuration.seconds}`
                            `${totalDuration.minutes - currentDuration.minutes}:${totalDuration.seconds - currentDuration.seconds}`
                        );
                    }

                    const updateCurrentTime = () => {
                        $(elemStartTime).html(
                            // `${currentDuration.hours}:${currentDuration.minutes}:${currentDuration.seconds}`
                            `${currentDuration.minutes}:${currentDuration.seconds}`
                        );
                    }

                    const updateSeekbar = () => {
                        seekPercentage = helper_getPercentage(currentTimeInSeconds, totalDurationInSeconds);
                        $(elemVideoProgress).css({ width : `${seekPercentage}%`});
                    }

                    const updateVolumeBar = () => {
                        $(elemVolumeProgress).css({ width : `${volumePercentage}%`});
                    }
                    //***** END Updates *****//

                    // 01. Update the Total Duration
                    elemVideo.on('loadeddata', () => {
                        totalDurationInSeconds = elemVideo['0'].duration;
                        totalDuration = helper_calcDuration(totalDurationInSeconds);
                        updateTotalDuration();
                        updateVolumeBar();
                    });

                    // 02. Update the SeekBars
                    elemVideo.on('timeupdate', () => {
                        currentTimeInSeconds = elemVideo['0'].currentTime;
                        currentDuration = helper_calcDuration(currentTimeInSeconds);
                        updateCurrentTime();
                        updateTotalDuration();
                        updateSeekbar();
                    })

                    elemVideo.on('volumechange', () => {
                        volumePercentage = elemVideo['0'].volume * 100;
                        updateVolumeBar();
                    })

                    // 03. Video 'Ended'
                    elemVideo.on('ended', () => {
                        elemVideo['0'].currentTime = 0;
                        $(elemPlayPause)
                            .removeClass('pause')
                            .addClass('play');
                        $(playerVideo)
                            .removeClass('play')
                            .addClass('pause');
                    });

                    // USER: Play/Pause Video
                    $(elemPlayPause).on('click', () => {
                        $(elemPlayPause)
                            .toggleClass('play pause')

                        $(playerVideo)
                            .toggleClass('play pause')

                        if(!elemVideo['0'].paused){
                            elemVideo['0'].pause();
                        } else {
                            elemVideo['0'].play()
                        }
                    });

                    // USER: Close Video
                    $(elemCloser).on('click', () => {
                        $('#videopopup').removeClass('active');
                        elemVideo['0'].pause();
                        elemVideo['0'].currentTime = 0;

                        $(elemPlayPause)
                            .removeClass('pause')
                            .addClass('play');
                        $(playerVideo)
                            .removeClass('play')
                            .addClass('pause');
                    });

                    // USER: Toggle Volume ON/OFF
                    $(elemToggleVolume).on('click', () => {
                        elemVideo['0'].volume = elemVideo['0'].volume
                            ? 0
                            : volumeValue;
                        $(elemToggleVolume).toggleClass('on off');
                        $(elemVolumeSeekbar).toggleClass('disabled');
                    });

                    // USER: SeekBar Clicks
                    $(elemVideoSeekbar).on('click', e => {
                        let tempSeekPosition =
                            e.pageX - playerVideo.offsetLeft - elemControls['0'].offsetLeft;
                        let tempSeekValue = tempSeekPosition / elemVideoSeekbar['0'].clientWidth;
                        elemVideo['0'].currentTime = tempSeekValue * totalDurationInSeconds;
                    })

                    // USER: VolumeBar Clicks
                    $(elemVolumeSeekbar).on('click', e => {
                        let tempVolumePosition =
                            e.pageX - playerVideo.offsetLeft - elemControls['0'].offsetLeft - elemVolumeSeekbar['0'].offsetLeft;
                        let tempVolumeValue = tempVolumePosition / elemVolumeSeekbar['0'].clientWidth;
                        elemVideo['0'].volume = tempVolumeValue.toFixed(1);
                        volumePercentage = tempVolumeValue.toFixed(1) * 100;
                        $(elemToggleVolume).addClass('on').removeClass('off');
                    });
                });
            });
        });
    }
}
