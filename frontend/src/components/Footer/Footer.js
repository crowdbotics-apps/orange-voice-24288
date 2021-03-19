
import React, { memo } from 'react';
import { Container } from 'reactstrap';
// used for making the prop types of this component
import PropTypes from 'prop-types';

const Footer = memo(({ defaultValue, fluid }) => {
  return (
    <footer
      className={'footer' + (defaultValue ? ' footer-default' : '')
      }
    >
      <Container fluid={fluid ? true : false}>
        <nav>
          <ul>
            <li>
              <a href="https://www.creative-tim.com?ref=nudr-footer" target="_blank" rel="noopener noreferrer" >Creative Tim</a>
            </li>
            <li>
              <a href="https://presentation.creative-tim.com?ref=nudr-footer" target="_blank" rel="noopener noreferrer" >About Us</a>
            </li>
            <li>
              <a href="https://blog.creative-tim.com?ref=nudr-footer" target="_blank" rel="noopener noreferrer" >Blog</a>
            </li>
          </ul>
        </nav>
        <div className="copyright">
          &copy; {1900 + new Date().getYear()}, Designed by{' '}
          <a
            href="https://www.invisionapp.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Invision
            </a>
          . Coded by{' '}
          <a
            href="https://www.creative-tim.com?ref=nudr-footer"
            target="_blank"
            rel="noopener noreferrer"
          >
            Creative Tim
            </a>
          .
          </div>
      </Container>
    </footer >
  );
});
Footer.displayName = 'Footer';
Footer.propTypes = {
  defaultValue: PropTypes.bool,
  fluid: PropTypes.bool
};

export default Footer;
