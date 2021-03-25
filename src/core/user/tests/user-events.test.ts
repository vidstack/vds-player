import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { spy, stub } from 'sinon';

import { FakeMediaProvider } from '../../fakes/FakeMediaProvider';
import { emitEvent } from '../../fakes/helpers';
import {
  VdsUserMutedChangeEvent,
  VdsUserPauseEvent,
  VdsUserPlayEvent,
  VdsUserSeekedEvent,
  VdsUserVolumeChangeEvent,
} from '../user.events';

describe('user events', () => {
  let container: HTMLDivElement;
  let provider: FakeMediaProvider;
  let user: HTMLDivElement;

  beforeEach(async () => {
    container = await fixture<HTMLDivElement>(html`
      <div>
        <vds-fake-media-provider>
          <div></div>
        </vds-fake-media-provider>
      </div>
    `);

    provider = container.firstElementChild as FakeMediaProvider;
    user = provider.firstElementChild as HTMLDivElement;
  });

  async function dispatchUserRequest(e: Event) {
    emitEvent(user, e);
  }

  it(`should request provider to play when ${VdsUserPlayEvent.TYPE} is fired`, async () => {
    const playSpy = spy(provider, 'play');
    stub(provider, 'canPlay').get(() => true);
    dispatchUserRequest(new VdsUserPlayEvent());
    await oneEvent(provider, VdsUserPlayEvent.TYPE);
    expect(playSpy).to.have.been.calledOnce;
  });

  it(`should request provider to pause when ${VdsUserPauseEvent.TYPE} is fired`, async () => {
    const pauseSpy = spy(provider, 'pause');
    stub(provider, 'canPlay').get(() => true);
    dispatchUserRequest(new VdsUserPauseEvent());
    await oneEvent(provider, VdsUserPauseEvent.TYPE);
    expect(pauseSpy).to.have.been.calledOnce;
  });

  it(`should request provider to mute when ${VdsUserMutedChangeEvent.TYPE} is fired`, async () => {
    const mutedSpy = spy(provider, 'setMuted');
    stub(provider, 'canPlay').get(() => true);
    dispatchUserRequest(new VdsUserMutedChangeEvent({ detail: true }));
    await oneEvent(provider, VdsUserMutedChangeEvent.TYPE);
    expect(mutedSpy).to.have.been.calledOnceWith(true);
  });

  it(`should request provider to change volume when ${VdsUserVolumeChangeEvent.TYPE} is fired`, async () => {
    const volumeSpy = spy(provider, 'setVolume');
    stub(provider, 'canPlay').get(() => true);
    dispatchUserRequest(new VdsUserVolumeChangeEvent({ detail: 0.83 }));
    await oneEvent(provider, VdsUserVolumeChangeEvent.TYPE);
    expect(volumeSpy).to.have.been.calledOnceWith(0.83);
  });

  it(`should request provider to change time when ${VdsUserSeekedEvent.TYPE} is fired`, async () => {
    const currentTimeSpy = spy(provider, 'setCurrentTime');
    stub(provider, 'canPlay').get(() => true);
    dispatchUserRequest(new VdsUserSeekedEvent({ detail: 23 }));
    await oneEvent(provider, VdsUserSeekedEvent.TYPE);
    expect(currentTimeSpy).to.have.been.calledOnceWith(23);
  });

  it('should prevent user events from bubbling by default', async () => {
    const callback = spy();
    container.addEventListener(VdsUserPlayEvent.TYPE, callback);

    dispatchUserRequest(new VdsUserPlayEvent());
    await oneEvent(provider, VdsUserPlayEvent.TYPE);

    expect(callback).to.not.have.been.called;
  });

  it('should allow user events to bubble', async () => {
    const callback = spy();

    provider.allowUserEventsToBubble = true;
    container.addEventListener(VdsUserPlayEvent.TYPE, callback);

    dispatchUserRequest(new VdsUserPlayEvent());
    await oneEvent(container, VdsUserPlayEvent.TYPE);

    expect(callback).to.have.been.called;
  });
});