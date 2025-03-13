/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package lauberge;

import basicgraphics.ClockWorker;
import basicgraphics.Scene;
import basicgraphics.Sprite;
import basicgraphics.Task;
import basicgraphics.images.Picture;

/**
 *
 * @author elira
 */
public class PlayingCard extends Sprite{

    public Picture card;
    int count = 0;
    public PlayingCard(Scene sc, String file) {
        super(sc);
        card = new Picture(file);
        setPicture(card);
 
         ClockWorker.addTask(new Task() {
            @Override
            public void run() {
                count++;
                if (count == 40) {
                  setHeadingOffset(Math.PI*2);
                   setVel(0,.5); 
                } else if (count == 80) {
                   setVel(0,-.5);
                    count = 0;
                }
            }
        });   
    }  

}