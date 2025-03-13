/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package lauberge;

import basicgraphics.images.BackgroundPainter;
import basicgraphics.BasicFrame;
import basicgraphics.BasicLayout;
import basicgraphics.Card;
import basicgraphics.ClockWorker;
import basicgraphics.SpriteComponent;
import basicgraphics.Task;
import basicgraphics.images.Painter;
import basicgraphics.images.Picture;
import basicgraphics.sounds.ReusableClip;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.io.IOException;
import java.util.Random;
import javax.swing.JButton;
import javax.swing.JLabel;

/**
 *
 * @author eraybu4
 */
public class Casino {

    public static void main(String[] args) throws IOException {
    final BasicFrame bf = new BasicFrame("L'auberge");
    
    Font customFont = CustomFont.customFont("font/CasinoFlat.ttf", 70f);
    bf.setAllFonts(customFont);
    
    Card start = bf.getCard();
    Card selection = bf.getCard();
    start.requestFocus();
    ClockWorker.initialize(15);
    

         Painter startBackground = (Graphics g, Dimension d) -> {
             g.setColor(new Color(53, 101, 77));
             g.fillRect(0, 0, d.width, d.height);
        };
         
         Painter shadow = (Graphics g, Dimension d) -> {
             g.setColor(new Color(53,101,77));
             g.fillRect(0, 0, d.width, d.height);
             g.setColor(new Color(0,57,0));
             g.fillRect(80,190, 240, 100);
             g.fillRect(85, 195, 230, 100);
             g.fillRect(90, 200, 220, 100);
         };
         
    final SpriteComponent sc = new SpriteComponent();
    sc.setPreferredSize(new Dimension(400,400));
    ClockWorker.addTask(sc.moveSprites());
    sc.getScene().setPainter(shadow);
   
    String[][] startLayout = {
        {"row1"},
        {"row2"},
        {"row3"}
    }; 
    
     start.setStringLayout(startLayout);
     start.setPainter(startBackground);

     final PlayingCard back = new PlayingCard(sc.getScene(), "B.png");
     back.setX(72);
     back.setY(72);
     back.setHeadingOffset(Math.PI/2);
     
     JLabel title = new JLabel("Lauberge Simulator", JLabel.CENTER);
     title.setForeground(Color.white);
     title.setFont(customFont);
     start.add("row1", title);
     
     JLabel enter = new JLabel("click card to start", JLabel.CENTER);
     enter.setForeground(Color.white);
     enter.setFont(customFont);
     start.add("row3", enter);
     
     start.add("row2",sc);
     
     selection.setPainter(startBackground);
     
         String[][] selectionLayout = {
        {"row1","row1"},
        {"blackjack","roulette"}
        
    }; 
         
     selection.setStringLayout(selectionLayout);
     JLabel select = new JLabel("select your game", JLabel.CENTER);
     select.setForeground(Color.white);
     select.setFont(customFont);
     selection.add("row1", select);
     
     SpriteComponent sc2 = new SpriteComponent();
     sc2.setPreferredSize(new Dimension(400,400));
     ClockWorker.addTask(sc2.moveSprites());
     
     SpriteComponent sc3 = new SpriteComponent();
     sc3.setPreferredSize(new Dimension(400,400));
     ClockWorker.addTask(sc3.moveSprites());
     
     final PlayingCard BJ = new PlayingCard(sc2.getScene(), "B.png");
     BJ.setX(72);
     BJ.setY(72);
     BJ.setHeadingOffset(Math.PI/2);
     
     final PlayingCard roul = new PlayingCard(sc3.getScene(), "B.png");
     roul.setX(72);
     roul.setY(72);
     roul.setHeadingOffset(Math.PI/2);
     
     selection.add("blackjack", sc2);
     selection.add("roulette", sc3);
     
         
    MouseListener ml = new MouseListener() {
        @Override
        public void mouseClicked(MouseEvent e) {
            
            selection.showCard();
            selection.requestFocus();
            ClockWorker.initialize(15);
            
        }

        @Override
        public void mousePressed(MouseEvent e) {
            
        }

        @Override
        public void mouseReleased(MouseEvent e) {
            
        }

        @Override
        public void mouseEntered(MouseEvent e) {
            
        }

        @Override
        public void mouseExited(MouseEvent e) {
            
        }
     };  
     
     sc.addMouseListener(ml);
     bf.show();

        
    }
}