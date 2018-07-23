import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class About extends Component {
  componentDidMount() {
    this.props.ReactGA.pageview('About Page');
  }

  render() {
    return (
      <div>
        <p>
          This site was designed to help myself spend less time on Reddit.
          Although I&#8217;ve always been conscious that I spend a lot of time
          on the internet, I never realized the true extent of the time wasted
          until I installed{' '}
          <a href="https://www.rescuetime.com/">RescueTime.</a> I was shocked to
          find that during school terms I managed to spend an average of an hour
          per day on the site.
        </p>
        <p>
          What frustrated me the most was how little it provided to my daily
          life. When I originally joined the site I had active fun browsing
          through communities and finding people with like interests. However,
          after five years of browsing Reddit daily, I reached the point where
          little surprised or challenged me. Most times if you asked, I
          wouldn&#8217;t be able to tell you what I&#8217;d read in the last 30
          minutes. My browsing was completely mindless. And when it wasn&#8217;t
          mindless, it was anxiety-inducing. I would read threads about
          political developments and become convinced that impending doom was
          inevitable.
        </p>
        <p>
          I found myself able to reduce my usage of all other social media sites
          with relative ease. I&#8217;ve unfollowed practically everyone on my
          Facebook, to the point where the feed is often completely blank.
          Twitter I simply logged out of and now only check a few select
          accounts. For Youtube I installed an extension to remove the
          &#8220;related videos&#8221; sidebar and found myself spending 50%
          less time on the site. But I kept coming back to Reddit, even despite
          my dissatsifaction with the platform.
        </p>
        <p>
          Eventually I realized the issue - for all other sites I simply reduced
          my usage to the point where they could be read in 30 seconds or less.
          With Reddit, I was trying to avoid the site altogether, and found
          myself missing the satisfaction of being up to date. With that in
          mind, I set upon creating a site that could maximize the things I
          liked about Reddit while preventing it from being a time-waster.
        </p>
        <p>
          mindful<span className="red">reddit</span> is designed to alleviate my
          personal grievances with the platform. The site presents the user with
          three fields for subreddits, which limits the flood of information
          that is typically displayed. One has to actively choose the type of
          content they want to see; an individual doesn&#8217;t have to worry
          about distressing news headlines if they&#8217;re having a bad day and
          only want to view /r/aww. Additionally, the three posts from each
          subreddit only present the top three comments. I often found that
          comments past the top three were reiterating points already made or
          simply devolving into bad faith arguments. Finally, the site&#8217;s
          three hour time limit helps break the cycle of obsessively checking
          for updates, so one can spend more time doing what they truly love.
        </p>
        <p>
          I don&#8217;t believe Reddit is a bad site, but like most it is
          monetized by attention. The platform is designed to keep your focus by
          any means possible; focus that could be spent reading books or
          learning a new language or spending time with friends. As much as I
          love the internet, I need it in less sizeable doses. I hope this site
          can help you if you&#8217;re trying to do the same.
        </p>
        <p>
          The source for this website is available on{' '}
          <a href="https://github.com/Qcode/mindfulreddit">GitHub</a>. If
          you&#8217;re interested in my other projects or more pretentious
          ramblings, please see{' '}
          <a href="https://rossevans.ca/">my personal site</a>. Thank you for
          your time.
        </p>
        <footer>
          <NavLink className="" to="/">
            <p>Home</p>
          </NavLink>
        </footer>
      </div>
    );
  }
}

export default About;
