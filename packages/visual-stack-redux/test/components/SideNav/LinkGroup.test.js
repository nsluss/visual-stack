/** @prettier */
import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';

import { InternalLinkGroup } from '../../../src/components/SideNav/LinkGroup';
import { LinkGroup, Link } from '@cjdev/visual-stack/lib/components/SideNav';

describe('LinkGroup', () => {
  it('should propagate label to visual stack link group', () => {
    const wrapper = shallow(
      <InternalLinkGroup label="whatever" />
    );
    expect(wrapper.find(LinkGroup).prop('label')).to.equal('whatever');
  });

  it('should calculate expanded value based on state', () => {
    const label = 'LABEL';
    const state = {
      [label]: {
        expanded: false,
      },
      ANOTHER_LINK_GROUP: {
        expanded: true,
      },
    };
    const wrapper = mount(
      <InternalLinkGroup label={label} linkGroups={state} />
    );
    expect(wrapper.find(LinkGroup).prop('expanded')).to.be.false;
  });

  it('should calculate expanded value when not in state', () => {
    const label = 'LABEL';
    const state = {
      ANOTHER_LINK_GROUP: {
        expanded: true,
      },
    };

    const wrapper = mount(
      <InternalLinkGroup label={label} linkGroups={state} />
    );
    expect(wrapper.find(LinkGroup).prop('expanded')).to.be.false;
  });

  it('should toggle itself when clicked with given state', () => {
    const label = 'LABEL';
    const faker = sinon.spy();
    const toggleFake = sinon.spy();

    const wrapper = mount(
      <InternalLinkGroup
        label={label}
        linkGroups={{}}
        toggleSideNav={toggleFake}
        toggleSideNavLinkGroup={faker}
      />
    );

    wrapper.find(LinkGroup).find('.sidenav-container-label').simulate('click');
    expect(faker).to.have.been.calledWith(true, label);
    expect(toggleFake).to.have.been.calledOnce;
    expect(toggleFake).to.have.been.calledWith(false);
  });

  it('should propagate children to VisualStack LinkGroup', () => {
    const wrapper = mount(
      <InternalLinkGroup label="whatever" linkGroups={{}}>
        <Link><a href="mockRouterLink">123</a></Link>
      </InternalLinkGroup>
    );
    expect(wrapper.find(Link)).to.have.length(1);
    expect(wrapper.find(Link)).text().to.equal('123');
  });
});
